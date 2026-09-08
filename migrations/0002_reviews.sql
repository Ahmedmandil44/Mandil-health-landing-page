-- Client testimonials. Public pages only read status = 'approved'.
create table if not exists reviews (
  id            text primary key,
  rating        integer not null check (rating between 1 and 5),
  review_text   text not null,
  display_name  text not null,
  state         text,
  image_data    text,
  consent       boolean not null default false,
  status        text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at    timestamptz not null default now(),
  approved_at   timestamptz
);

create index if not exists reviews_status_created_idx
  on reviews (status, created_at desc);

create table if not exists review_admin (
  id              integer primary key check (id = 1),
  password_hash   text not null,
  session_token   text,
  session_expires timestamptz
);
