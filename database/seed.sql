-- Pre-seed some default categories
INSERT INTO categories (name, slug) VALUES 
('Programming', 'programming'),
('AI & LLMs', 'ai'),
('Databases', 'database'),
('Operating Systems', 'operating-systems'),
('Data Structures & Algorithms', 'dsa');

-- Pre-seed default tags
INSERT INTO tags (name, slug) VALUES 
('TypeScript', 'typescript'),
('Python', 'python'),
('Supabase', 'supabase'),
('Algorithms', 'algorithms');
