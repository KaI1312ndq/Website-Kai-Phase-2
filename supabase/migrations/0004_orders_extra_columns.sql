-- Applied via Supabase MCP 2026-05-12.
-- Thêm columns cho orders để mirror Sanity order schema (downloadToken, deliveryStatus, etc.).

alter table public.orders
  add column if not exists voucher_discount numeric(12,2) default 0,
  add column if not exists delivery_status text default 'pending',
  add column if not exists download_token text unique,
  add column if not exists download_expires_at timestamptz,
  add column if not exists resend_email_id text;

create index if not exists orders_download_token_idx on public.orders(download_token);
create index if not exists orders_email_idx on public.orders(customer_email);
