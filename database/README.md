# Database Configuration & Infrastructure

This directory holds the SQL schemas and pre-seeded metadata scripts to build your Supabase PostgreSQL database.

## Setup Instructions

1. Log into your **Supabase Dashboard** and create a new project.
2. Open the **SQL Editor** tab inside the dashboard.
3. Copy the contents of `schema.sql` and run it to construct all tables and Row Level Security (RLS) policies.
4. Run the contents of `seed.sql` to populate default categories and tags.
5. Setup the environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` inside your client `.env` configuration files to establish connection handles.
