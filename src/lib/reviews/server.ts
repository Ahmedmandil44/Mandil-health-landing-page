import { createServerFn } from "@tanstack/react-start";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { getSql } from "@/lib/db";
import type { AdminReview, PublicReview, ReviewStatus } from "./types";

const MAX_TEXT = 1000;
const MAX_NAME = 60;
const MAX_IMAGE_CHARS = 180_000;
const SESSION_HOURS = 12;

type ReviewRow = {
  id: string;
  rating: number;
  review_text: string;
  display_name: string;
  state: string | null;
  image_data: string | null;
  consent: boolean;
  status: ReviewStatus;
  created_at: string;
  approved_at: string | null;
};

function asBool(v: unknown) {
  return v === true || v === "t" || v === "true";
}

function toPublic(row: ReviewRow, includeImage: boolean): PublicReview {
  return {
    id: row.id,
    rating: Number(row.rating),
    reviewText: row.review_text,
    displayName: row.display_name,
    state: row.state,
    imageUrl: includeImage && row.image_data ? row.image_data : null,
    createdAt: String(row.created_at),
  };
}

function toAdmin(row: ReviewRow): AdminReview {
  return {
    ...toPublic(row, true),
    status: row.status,
    consent: asBool(row.consent),
    approvedAt: row.approved_at ? String(row.approved_at) : null,
  };
}

function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 32);
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

function verifyPassword(password: string, stored: string) {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;
  const actual = scryptSync(password, Buffer.from(saltHex, "hex"), 32);
  const expected = Buffer.from(hashHex, "hex");
  if (actual.length !== expected.length) return false;
  return timingSafeEqual(actual, expected);
}

function cleanText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

function isValidImage(data: string | null) {
  if (!data) return true;
  if (data.length > MAX_IMAGE_CHARS) return false;
  return /^data:image\/(jpeg|jpg|png|webp);base64,/i.test(data);
}

async function requireAdmin(token: string) {
  const sql = await getSql();
  const rows = await sql<{
    session_token: string | null;
    session_expires: string | null;
  }>`select session_token, session_expires from review_admin where id = 1`;
  const row = rows[0];
  if (!row?.session_token || !token || token !== row.session_token) {
    throw new Error("Unauthorized");
  }
  if (row.session_expires && new Date(row.session_expires).getTime() < Date.now()) {
    throw new Error("Unauthorized");
  }
}

async function notifyOwner(review: {
  display_name: string;
  rating: number;
  review_text: string;
  state: string | null;
}) {
  try {
    await fetch("https://formsubmit.co/ajax/ahmed@mandilhealth.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: "New Mandil Health review is pending",
        name: review.display_name,
        rating: String(review.rating),
        review: review.review_text,
        state: review.state || "Not given",
        note: "This review is pending. Approve or reject it at /reviews-admin.",
      }),
    });
  } catch {
    // optional
  }
}

export const listApprovedReviews = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicReview[]> => {
    const sql = await getSql();
    const rows = await sql<ReviewRow>`
      select id, rating, review_text, display_name, state, image_data, consent, status, created_at, approved_at
      from reviews
      where status = 'approved'
      order by approved_at desc nulls last, created_at desc
    `;
    return rows.map((row) => toPublic(row, true));
  },
);

export const submitReview = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const data = (input ?? {}) as Record<string, unknown>;
    return {
      rating: Number(data.rating),
      reviewText: cleanText(data.reviewText, MAX_TEXT),
      displayName: cleanText(data.displayName, MAX_NAME),
      state: cleanText(data.state, 2).toUpperCase() || null,
      imageData: typeof data.imageData === "string" ? data.imageData : null,
      consent: Boolean(data.consent),
      website: typeof data.website === "string" ? data.website : "",
    };
  })
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const };
    if (!Number.isInteger(data.rating) || data.rating < 1 || data.rating > 5) {
      throw new Error("Please choose a star rating.");
    }
    if (data.reviewText.length < 8) {
      throw new Error("A sentence or two is perfect.");
    }
    if (data.displayName.length < 2) {
      throw new Error("Add the name you want shown with your review.");
    }
    if (!data.consent) {
      throw new Error("Please confirm we can share this review.");
    }
    if (!isValidImage(data.imageData)) {
      throw new Error("Please use a smaller JPG, PNG, or WebP photo.");
    }
    const sql = await getSql();
    const id = randomBytes(16).toString("hex");
    await sql`
      insert into reviews (id, rating, review_text, display_name, state, image_data, consent, status)
      values (
        ${id},
        ${data.rating},
        ${data.reviewText},
        ${data.displayName},
        ${data.state},
        ${data.imageData},
        ${data.consent},
        'pending'
      )
    `;
    void notifyOwner({
      display_name: data.displayName,
      rating: data.rating,
      review_text: data.reviewText,
      state: data.state,
    });
    return { ok: true as const };
  });

export const adminStatus = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ configured: boolean }> => {
    const sql = await getSql();
    const rows = await sql<{ n: number }>`select count(*)::int as n from review_admin`;
    return { configured: Number(rows[0]?.n ?? 0) > 0 };
  },
);

export const adminSetup = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const data = (input ?? {}) as Record<string, unknown>;
    return { password: typeof data.password === "string" ? data.password : "" };
  })
  .handler(async ({ data }) => {
    if (data.password.length < 8) {
      throw new Error("Use at least 8 characters.");
    }
    const sql = await getSql();
    const existing = await sql<{ n: number }>`select count(*)::int as n from review_admin`;
    if (Number(existing[0]?.n ?? 0) > 0) {
      throw new Error("Admin access is already set up.");
    }
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + SESSION_HOURS * 3600 * 1000).toISOString();
    await sql`
      insert into review_admin (id, password_hash, session_token, session_expires)
      values (1, ${hashPassword(data.password)}, ${token}, ${expires})
    `;
    return { token };
  });

export const adminLogin = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const data = (input ?? {}) as Record<string, unknown>;
    return { password: typeof data.password === "string" ? data.password : "" };
  })
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<{ password_hash: string }>`select password_hash from review_admin where id = 1`;
    const row = rows[0];
    if (!row || !verifyPassword(data.password, row.password_hash)) {
      throw new Error("That password did not match.");
    }
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + SESSION_HOURS * 3600 * 1000).toISOString();
    await sql`
      update review_admin
      set session_token = ${token}, session_expires = ${expires}
      where id = 1
    `;
    return { token };
  });

export const adminListReviews = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const data = (input ?? {}) as Record<string, unknown>;
    return { token: typeof data.token === "string" ? data.token : "" };
  })
  .handler(async ({ data }): Promise<AdminReview[]> => {
    await requireAdmin(data.token);
    const sql = await getSql();
    const rows = await sql<ReviewRow>`
      select id, rating, review_text, display_name, state, image_data, consent, status, created_at, approved_at
      from reviews
      order by
        case status when 'pending' then 0 when 'approved' then 1 else 2 end,
        created_at desc
    `;
    return rows.map(toAdmin);
  });

export const adminSetStatus = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const data = (input ?? {}) as Record<string, unknown>;
    const status = data.status;
    if (status !== "approved" && status !== "rejected" && status !== "pending") {
      throw new Error("Invalid status");
    }
    return {
      token: typeof data.token === "string" ? data.token : "",
      id: typeof data.id === "string" ? data.id : "",
      status: status as ReviewStatus,
    };
  })
  .handler(async ({ data }) => {
    await requireAdmin(data.token);
    if (!data.id) throw new Error("Missing review");
    const sql = await getSql();
    const approvedAt = data.status === "approved" ? new Date().toISOString() : null;
    await sql`
      update reviews
      set status = ${data.status}, approved_at = ${approvedAt}
      where id = ${data.id}
    `;
    return { ok: true as const };
  });
