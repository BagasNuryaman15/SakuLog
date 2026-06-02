create table transactions (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null references auth.users(id) on delete cascade,

  type text not null check (type in ('expense', 'income')),

  name text not null,

  amount numeric(12, 2) not null check (amount > 0),

  category text not null,

  payment_method text,

  source text,

  transaction_date date not null,

  note text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_transactions_updated_at
before update on transactions
for each row
execute function update_updated_at();

alter table transactions enable row level security;

create policy "Users can view their own transactions"
on transactions for select
using (auth.uid() = user_id);

create policy "Users can insert their own transactions"
on transactions for insert
with check (auth.uid() = user_id);

create policy "Users can update their own transactions"
on transactions for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own transactions"
on transactions for delete
using (auth.uid() = user_id);

create index transactions_user_date_idx
on transactions (user_id, transaction_date desc);

create index transactions_user_type_date_idx
on transactions (user_id, type, transaction_date desc);

create index transactions_user_category_date_idx
on transactions (user_id, category, transaction_date desc);
