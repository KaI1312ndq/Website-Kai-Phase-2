-- AI Video Studio - token-based video generator
-- Brief: /Users/Kaiii/Downloads/AI Video Tool Brief.md (adapted for Clerk auth)
-- Apply via Supabase MCP after review.

-- ============================================
-- 1. video_profiles - token balance per user
-- ============================================
create table if not exists public.video_profiles (
  user_id              text primary key references public.users(id) on delete cascade,
  token_balance        int not null default 0,
  total_spent_vnd      bigint not null default 0,
  total_videos_created int not null default 0,
  welcome_bonus_granted boolean not null default false,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

-- ============================================
-- 2. video_token_transactions - audit trail
-- ============================================
create table if not exists public.video_token_transactions (
  id            uuid primary key default uuid_generate_v4(),
  user_id       text not null references public.users(id) on delete cascade,
  type          text not null check (type in ('topup','spend','refund','bonus','adjust')),
  amount        int not null,           -- positive for credit, negative for spend
  balance_after int not null,
  reference_id  uuid,                    -- video_id or payment_id
  note          text,
  created_at    timestamptz not null default now()
);
create index if not exists video_tx_user_idx on public.video_token_transactions(user_id, created_at desc);
create index if not exists video_tx_ref_idx  on public.video_token_transactions(reference_id);

-- ============================================
-- 3. video_payments - topup orders
-- ============================================
create table if not exists public.video_payments (
  id              uuid primary key default uuid_generate_v4(),
  user_id         text not null references public.users(id) on delete cascade,
  amount_vnd      bigint not null,           -- user paid
  tokens_received int not null,              -- including bonus
  bonus_percent   int not null default 0,    -- 0/10/20/30
  method          text not null check (method in ('bank','momo')),
  status          text not null default 'pending'
    check (status in ('pending','completed','failed','expired','cancelled')),
  bank_memo       text,                       -- VietQR memo for matching
  casso_tx_id     text,                       -- Casso transaction ID when matched
  momo_request_id text,
  created_at      timestamptz not null default now(),
  paid_at         timestamptz,
  expires_at      timestamptz not null default (now() + interval '24 hours')
);
create index if not exists video_payments_user_idx on public.video_payments(user_id, created_at desc);
create index if not exists video_payments_status_idx on public.video_payments(status, expires_at);
create index if not exists video_payments_memo_idx on public.video_payments(bank_memo);

-- ============================================
-- 4. video_avatars - user custom avatars (Pro feature)
-- ============================================
create table if not exists public.video_avatars (
  id          uuid primary key default uuid_generate_v4(),
  user_id     text not null references public.users(id) on delete cascade,
  name        text not null,
  image_url   text not null,           -- R2 URL
  thumbnail_url text,
  created_at  timestamptz not null default now()
);
create index if not exists video_avatars_user_idx on public.video_avatars(user_id, created_at desc);

-- ============================================
-- 5. videos - the main entity
-- ============================================
create table if not exists public.videos (
  id            uuid primary key default uuid_generate_v4(),
  user_id       text not null references public.users(id) on delete cascade,

  -- input
  input_data    jsonb not null,          -- product info, style, voice, prompts
  duration      int not null,            -- seconds: 15/20/25/30
  tier          text not null check (tier in ('eco','standard','pro')),
  token_cost    int not null,
  avatar_id     uuid references public.video_avatars(id) on delete set null,
  is_draft      boolean not null default false,
  queue_priority int not null default 0,

  -- status pipeline
  status        text not null default 'pending' check (status in (
    'pending','scripting','imaging','animating','composing',
    'completed','failed','refunded','cancelled'
  )),
  status_message text,
  progress_percent int default 0,

  -- output
  output_url    text,                    -- R2 final MP4
  thumbnail_url text,
  watermark     boolean not null default false,

  -- error tracking
  error_message text,
  retry_count   int not null default 0,
  failed_step   text,

  -- generated artifacts
  script_text   text,
  voice_id      text,
  music_track   text,

  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  started_at    timestamptz,
  completed_at  timestamptz
);
create index if not exists videos_user_idx on public.videos(user_id, created_at desc);
create index if not exists videos_status_idx on public.videos(status, queue_priority desc, created_at);

-- ============================================
-- 6. video_assets - intermediate clips/images
-- ============================================
create table if not exists public.video_assets (
  id          uuid primary key default uuid_generate_v4(),
  video_id    uuid not null references public.videos(id) on delete cascade,
  scene_idx   int not null,
  asset_type  text not null check (asset_type in ('image','clip','voice','music')),
  url         text,
  fal_job_id  text,
  prompt      text,
  cost_usd    numeric(10,4) default 0,
  cost_token  int default 0,
  status      text not null default 'pending' check (status in ('pending','processing','completed','failed')),
  created_at  timestamptz not null default now()
);
create index if not exists video_assets_video_idx on public.video_assets(video_id, scene_idx);

-- ============================================
-- 7. video_quota_log - daily/monthly usage tracking
-- ============================================
create table if not exists public.video_quota_log (
  id         uuid primary key default uuid_generate_v4(),
  user_id    text not null references public.users(id) on delete cascade,
  day        date not null default current_date,
  videos_created int not null default 0,
  tokens_spent int not null default 0,
  unique(user_id, day)
);
create index if not exists video_quota_user_day_idx on public.video_quota_log(user_id, day desc);

-- ============================================
-- 8. video_support_tickets - contact form
-- ============================================
create table if not exists public.video_support_tickets (
  id         uuid primary key default uuid_generate_v4(),
  user_id    text references public.users(id) on delete set null,
  email      text not null,
  subject    text not null,
  body       text not null,
  status     text not null default 'open' check (status in ('open','in_progress','closed')),
  created_at timestamptz not null default now()
);
create index if not exists video_tickets_status_idx on public.video_support_tickets(status, created_at desc);

-- ============================================
-- Triggers: touch updated_at
-- ============================================
drop trigger if exists video_profiles_touch on public.video_profiles;
create trigger video_profiles_touch before update on public.video_profiles
  for each row execute function public.touch_updated_at();

drop trigger if exists videos_touch on public.videos;
create trigger videos_touch before update on public.videos
  for each row execute function public.touch_updated_at();

-- ============================================
-- Atomic: create video + deduct token
-- ============================================
create or replace function public.create_video_with_token_lock(
  p_user_id       text,
  p_input_data    jsonb,
  p_duration      int,
  p_tier          text,
  p_token_cost    int,
  p_avatar_id     uuid default null,
  p_is_draft      boolean default false
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_balance     int;
  v_new_balance int;
  v_video_id    uuid;
  v_priority    int;
begin
  -- ensure profile exists
  insert into public.video_profiles (user_id)
  values (p_user_id)
  on conflict (user_id) do nothing;

  select token_balance into v_balance
  from public.video_profiles
  where user_id = p_user_id
  for update;

  if v_balance < p_token_cost then
    raise exception 'INSUFFICIENT_TOKENS' using errcode = 'P0001';
  end if;

  v_new_balance := v_balance - p_token_cost;

  update public.video_profiles
  set token_balance = v_new_balance,
      total_videos_created = total_videos_created + 1
  where user_id = p_user_id;

  v_priority := case p_tier
    when 'pro' then 20
    when 'standard' then 10
    else 0
  end;

  insert into public.videos (
    user_id, input_data, duration, tier, token_cost,
    avatar_id, is_draft, queue_priority, status
  )
  values (
    p_user_id, p_input_data, p_duration, p_tier, p_token_cost,
    p_avatar_id, p_is_draft, v_priority, 'pending'
  )
  returning id into v_video_id;

  insert into public.video_token_transactions (
    user_id, type, amount, balance_after, reference_id, note
  )
  values (
    p_user_id, 'spend', -p_token_cost, v_new_balance, v_video_id,
    'Video ' || p_tier || ' ' || p_duration || 's'
  );

  -- upsert daily quota log
  insert into public.video_quota_log (user_id, day, videos_created, tokens_spent)
  values (p_user_id, current_date, 1, p_token_cost)
  on conflict (user_id, day)
  do update set videos_created = video_quota_log.videos_created + 1,
                tokens_spent = video_quota_log.tokens_spent + p_token_cost;

  return v_video_id;
end;
$$;

-- ============================================
-- Atomic: refund token for failed video
-- ============================================
create or replace function public.refund_video_token(p_video_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id    text;
  v_token_cost int;
  v_balance    int;
  v_status     text;
begin
  select user_id, token_cost, status
    into v_user_id, v_token_cost, v_status
  from public.videos
  where id = p_video_id
  for update;

  if v_status = 'refunded' then
    return;  -- already refunded
  end if;

  select token_balance into v_balance
  from public.video_profiles
  where user_id = v_user_id
  for update;

  update public.video_profiles
  set token_balance = v_balance + v_token_cost
  where user_id = v_user_id;

  update public.videos
  set status = 'refunded',
      status_message = 'Auto refund - video failed'
  where id = p_video_id;

  insert into public.video_token_transactions (
    user_id, type, amount, balance_after, reference_id, note
  )
  values (
    v_user_id, 'refund', v_token_cost, v_balance + v_token_cost, p_video_id,
    'Auto refund - video failed'
  );
end;
$$;

-- ============================================
-- Atomic: credit tokens after payment confirmed
-- ============================================
create or replace function public.credit_tokens_from_payment(p_payment_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id       text;
  v_tokens        int;
  v_amount_vnd    bigint;
  v_status        text;
  v_balance       int;
begin
  select user_id, tokens_received, amount_vnd, status
    into v_user_id, v_tokens, v_amount_vnd, v_status
  from public.video_payments
  where id = p_payment_id
  for update;

  if v_status = 'completed' then
    return;  -- already credited
  end if;

  if v_status != 'pending' then
    raise exception 'PAYMENT_NOT_PENDING' using errcode = 'P0001';
  end if;

  -- ensure profile exists
  insert into public.video_profiles (user_id)
  values (v_user_id)
  on conflict (user_id) do nothing;

  select token_balance into v_balance
  from public.video_profiles
  where user_id = v_user_id
  for update;

  update public.video_profiles
  set token_balance = v_balance + v_tokens,
      total_spent_vnd = total_spent_vnd + v_amount_vnd
  where user_id = v_user_id;

  update public.video_payments
  set status = 'completed',
      paid_at = now()
  where id = p_payment_id;

  insert into public.video_token_transactions (
    user_id, type, amount, balance_after, reference_id, note
  )
  values (
    v_user_id, 'topup', v_tokens, v_balance + v_tokens, p_payment_id,
    'Topup ' || v_amount_vnd || ' VND'
  );
end;
$$;

-- ============================================
-- Atomic: grant welcome bonus (40 tokens) once per user
-- ============================================
create or replace function public.grant_video_welcome_bonus(p_user_id text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_already boolean;
begin
  insert into public.video_profiles (user_id, token_balance, welcome_bonus_granted)
  values (p_user_id, 40, true)
  on conflict (user_id) do nothing;

  -- check if already granted (re-read)
  select welcome_bonus_granted into v_already
  from public.video_profiles
  where user_id = p_user_id
  for update;

  if v_already then
    -- if profile existed but bonus not granted, grant now
    update public.video_profiles
    set welcome_bonus_granted = true,
        token_balance = token_balance + 40
    where user_id = p_user_id and welcome_bonus_granted = false;
  end if;

  insert into public.video_token_transactions (
    user_id, type, amount, balance_after, note
  )
  select p_user_id, 'bonus', 40,
         (select token_balance from public.video_profiles where user_id = p_user_id),
         'Welcome bonus - 40 tokens'
  where not exists (
    select 1 from public.video_token_transactions
    where user_id = p_user_id and type = 'bonus' and note like 'Welcome%'
  );

  return true;
end;
$$;

-- ============================================
-- RLS
-- ============================================
alter table public.video_profiles            enable row level security;
alter table public.video_token_transactions  enable row level security;
alter table public.video_payments            enable row level security;
alter table public.video_avatars             enable row level security;
alter table public.videos                    enable row level security;
alter table public.video_assets              enable row level security;
alter table public.video_quota_log           enable row level security;
alter table public.video_support_tickets     enable row level security;

-- Policies: users can read their own data; writes go through service role / RPC
do $$
begin
  if not exists (select 1 from pg_policies where policyname = 'video_profiles_select_own') then
    create policy video_profiles_select_own on public.video_profiles
      for select using (user_id = (auth.jwt() ->> 'sub'));
  end if;
  if not exists (select 1 from pg_policies where policyname = 'video_tx_select_own') then
    create policy video_tx_select_own on public.video_token_transactions
      for select using (user_id = (auth.jwt() ->> 'sub'));
  end if;
  if not exists (select 1 from pg_policies where policyname = 'video_payments_select_own') then
    create policy video_payments_select_own on public.video_payments
      for select using (user_id = (auth.jwt() ->> 'sub'));
  end if;
  if not exists (select 1 from pg_policies where policyname = 'video_avatars_select_own') then
    create policy video_avatars_select_own on public.video_avatars
      for select using (user_id = (auth.jwt() ->> 'sub'));
  end if;
  if not exists (select 1 from pg_policies where policyname = 'videos_select_own') then
    create policy videos_select_own on public.videos
      for select using (user_id = (auth.jwt() ->> 'sub'));
  end if;
  if not exists (select 1 from pg_policies where policyname = 'video_assets_select_own') then
    create policy video_assets_select_own on public.video_assets
      for select using (
        exists (select 1 from public.videos v where v.id = video_id and v.user_id = (auth.jwt() ->> 'sub'))
      );
  end if;
end $$;
