export type ReviewStatus = "pending" | "approved" | "rejected";

export type PublicReview = {
  id: string;
  rating: number;
  reviewText: string;
  displayName: string;
  state: string | null;
  imageUrl: string | null;
  createdAt: string;
};

export type AdminReview = PublicReview & {
  status: ReviewStatus;
  consent: boolean;
  approvedAt: string | null;
};
