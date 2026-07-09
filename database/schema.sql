-- 1. Setup Categories & Tags tables
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL
);

-- 2. Projects Schema
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  tagline TEXT NOT NULL,
  overview TEXT NOT NULL,
  problem TEXT,
  solution TEXT,
  github_url TEXT,
  demo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE project_tags (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, tag_id)
);

-- 3. Solutions Schema
CREATE TABLE solutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  tagline TEXT NOT NULL,
  overview TEXT NOT NULL,
  audience VARCHAR(255) NOT NULL,
  version VARCHAR(50) DEFAULT '1.0.0' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Notes Schema
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  difficulty VARCHAR(50) NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  file_type VARCHAR(50) DEFAULT 'PDF' NOT NULL,
  reading_time VARCHAR(100) NOT NULL,
  youtube_url TEXT,
  youtube_title TEXT,
  downloads_count INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Blog Articles Schema
CREATE TABLE blog_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL,
  reading_time VARCHAR(100) NOT NULL,
  author_name VARCHAR(255) DEFAULT 'Ali' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Media Schema
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  size VARCHAR(50) NOT NULL,
  url TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Messages Schema
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Deep Code Chapters Schema
CREATE TABLE deep_code_chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  university VARCHAR(255) NOT NULL,
  lead_name VARCHAR(255) NOT NULL,
  member_count INT DEFAULT 0 NOT NULL,
  status VARCHAR(50) DEFAULT 'Coming Soon' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Row Level Security policies

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE deep_code_chapters ENABLE ROW LEVEL SECURITY;

-- Public Read policies
CREATE POLICY "Allow public read categories" ON categories FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read tags" ON tags FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read projects" ON projects FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read solutions" ON solutions FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read notes" ON notes FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read blog_articles" ON blog_articles FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read deep_code_chapters" ON deep_code_chapters FOR SELECT TO public USING (true);

-- Admin Write policies (Authenticated users only)
CREATE POLICY "Allow admin write categories" ON categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin write tags" ON tags FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin write projects" ON projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin write solutions" ON solutions FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin write notes" ON notes FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin write blog_articles" ON blog_articles FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin write media" ON media FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin write deep_code_chapters" ON deep_code_chapters FOR ALL TO authenticated USING (true);

-- Messages RLS: Public Insert, Admin Read/Write
CREATE POLICY "Allow public insert messages" ON messages FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow admin manage messages" ON messages FOR ALL TO authenticated USING (true);

-- 10. Newsletter Subscribers Schema
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert subscribers" ON newsletter_subscribers FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow admin manage subscribers" ON newsletter_subscribers FOR ALL TO authenticated USING (true);

-- 11. Analytics Events Schema
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(100) NOT NULL,
  target_slug VARCHAR(255) NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert events" ON analytics_events FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow admin manage events" ON analytics_events FOR ALL TO authenticated USING (true);
