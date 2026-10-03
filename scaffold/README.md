# Portfolio CMS

A responsive Next.js portfolio backed by Supabase. Public pages use published, visible records from PostgreSQL; administrators manage the content through `/admin`.

## Requirements

- Node.js 20 or newer and npm
- A Supabase project (the free tier is suitable for a small portfolio)

## Local setup

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`. Find both in the Supabase project dashboard under **Project Settings → API**. The anon/publishable key is safe for browser use because access is constrained by Row Level Security. Never add a service role key to this app.

## Supabase setup

1. Create a Supabase project.
2. In **SQL Editor**, run `supabase/schema.sql`.
3. Run `supabase/seed.sql` to create the initial categories, technology list, and unpublished project placeholders. Placeholders have no invented descriptions and remain unpublished until edited.
4. Create an administrator in **Authentication → Users**. Set the user's `app_metadata` to `{"role":"admin"}` using the Supabase dashboard or a trusted server-side admin process. The login page checks this role; never put privileged credentials in the browser.
5. The schema creates public storage buckets for profile, project, achievement, skill images, and PDF documents. Authenticated administrators can upload; the frontend admin content manager accepts URLs so assets can also be uploaded in the Supabase Storage dashboard and their public URLs pasted into records.

RLS permits public reads only for published projects and visible content. Contact form submissions are public inserts with field length checks. Message reads, edits, deletes, and all content changes require an authenticated user whose JWT app metadata has `role=admin`.

## Content management

Visit `/admin/login` and sign in with the administrator account. The admin workspace provides record management for profile, projects, categories, technologies, skills, experience, education, achievements, social links, messages, and site settings. Project category IDs can be copied from the Categories records. Project technology relationships can be managed from SQL or added through the `project_technologies` join table.

The public homepage, About, Projects, project detail, Experience, Education, and Contact pages read content from Supabase. Project category filtering and text search run in the browser after the published records are fetched. Updates appear on the next page request without a redeploy.

## Development

```bash
npm run dev
npm run lint
npm run build
```

## GitHub and Vercel deployment

1. Push this directory to a GitHub repository.
2. Import the repository into Vercel.
3. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and optionally `NEXT_PUBLIC_SITE_URL` in Vercel project environment variables.
4. Deploy. Vercel builds the Next.js App Router app using the included scripts.

Set `NEXT_PUBLIC_SITE_URL` to the deployed canonical URL for sitemap and robots metadata. The app does not require a VPS, Docker host, paid database, or service role key.
