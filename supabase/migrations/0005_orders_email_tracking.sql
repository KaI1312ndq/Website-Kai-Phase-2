-- Applied via Supabase MCP 2026-05-12.
-- Email event tracking columns for Resend webhook updates.

alter table public.orders
  add column if not exists email_delivered boolean default false,
  add column if not exists email_opened boolean default false,
  add column if not exists email_opened_at timestamptz,
  add column if not exists email_clicked boolean default false,
  add column if not exists email_clicked_at timestamptz,
  add column if not exists email_bounced boolean default false;

create index if not exists orders_resend_email_id_idx on public.orders(resend_email_id);
