create extension if not exists pgcrypto;

create table if not exists digital_cards (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  edit_token text unique not null,
  status text not null default 'draft', -- draft | trialing | active | paused | cancelled
  card_json jsonb not null default '{}'::jsonb,
  asset_path text,
  
  -- Customer & Subscription Info
  email text not null, -- Customer email for trial notifications
  stripe_customer_id text,
  stripe_subscription_id text,
  stripe_price_id text,
  
  -- Trial Management
  trial_started_at timestamptz, -- When 30-day free trial begins
  trial_ends_at timestamptz, -- When 30-day free trial ends
  current_period_end timestamptz, -- Current billing period end
  
  -- Metadata
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists digital_cards_slug_idx on digital_cards (slug);
create index if not exists digital_cards_edit_token_idx on digital_cards (edit_token);
create index if not exists digital_cards_email_idx on digital_cards (email);
create index if not exists digital_cards_status_idx on digital_cards (status);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_set_updated_at on digital_cards;
create trigger trg_set_updated_at
before update on digital_cards
for each row execute function set_updated_at();

alter table digital_cards enable row level security;

-- Public read of card data by slug for rendering states on /card/:slug
drop policy if exists "public read cards" on digital_cards;
create policy "public read cards"
on digital_cards
for select
using (true);

-- Keep writes via service role only (Netlify functions)
