# Supabase Setup

SakuLog V1 uses one main database table: `transactions`.

## Environment Variables

Create a local `.env.local` file from the example:

```bash
cp .env.local.example .env.local
```

Fill it with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://mpnljbtwthmoomflvdsu.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<your Supabase publishable key>
```

Do not commit `.env.local`. Do not store the database password or a direct
database connection string in application code.

## Apply Schema

The migration reference is:

```text
supabase/migrations/001_create_transactions.sql
```

If the Supabase CLI is not initialized yet, apply the SQL manually in the
Supabase SQL Editor. Later, the same file can be applied through the Supabase
CLI after linking the project.

## Link Supabase CLI

```bash
supabase login
supabase init
supabase link --project-ref mpnljbtwthmoomflvdsu
```

## Generate Database Types

After the SQL schema has been applied, replace `types/supabase.ts` with generated
types:

```bash
supabase gen types typescript --project-id mpnljbtwthmoomflvdsu --schema public > types/supabase.ts
```

## Current Scope

This task only prepares the Supabase foundation. It does not implement login
behavior, auth redirects, transaction CRUD, dashboard queries, reports, charts,
AI advisor, or planning features.
