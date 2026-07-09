export interface Database {
  public: {
    Tables: {
      categories: {
        Row: { id: string; name: string; slug: string };
        Insert: { id?: string; name: string; slug: string };
        Update: { id?: string; name?: string; slug?: string };
      };
      tags: {
        Row: { id: string; name: string; slug: string };
        Insert: { id?: string; name: string; slug: string };
        Update: { id?: string; name?: string; slug?: string };
      };
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category_id: string | null;
          tagline: string;
          overview: string;
          problem: string | null;
          solution: string | null;
          github_url: string | null;
          demo_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          category_id?: string | null;
          tagline: string;
          overview: string;
          problem?: string | null;
          solution?: string | null;
          github_url?: string | null;
          demo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          category_id?: string | null;
          tagline?: string;
          overview?: string;
          problem?: string | null;
          solution?: string | null;
          github_url?: string | null;
          demo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      solutions: {
        Row: {
          id: string;
          slug: string;
          name: string;
          tagline: string;
          overview: string;
          audience: string;
          version: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          tagline: string;
          overview: string;
          audience: string;
          version?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          tagline?: string;
          overview?: string;
          audience?: string;
          version?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      notes: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category_id: string | null;
          description: string;
          difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
          file_type: string;
          reading_time: string;
          youtube_url: string | null;
          youtube_title: string | null;
          downloads_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          category_id?: string | null;
          description: string;
          difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
          file_type?: string;
          reading_time: string;
          youtube_url?: string | null;
          youtube_title?: string | null;
          downloads_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          category_id?: string | null;
          description?: string;
          difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
          file_type?: string;
          reading_time?: string;
          youtube_url?: string | null;
          youtube_title?: string | null;
          downloads_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      blog_articles: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category_id: string | null;
          excerpt: string;
          content: string;
          date: string;
          reading_time: string;
          author_name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          category_id?: string | null;
          excerpt: string;
          content: string;
          date: string;
          reading_time: string;
          author_name?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          category_id?: string | null;
          excerpt?: string;
          content?: string;
          date?: string;
          reading_time?: string;
          author_name?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          category: string;
          subject: string | null;
          message: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          category: string;
          subject?: string | null;
          message: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          category?: string;
          subject?: string | null;
          message?: string;
          is_read?: boolean;
          created_at?: string;
        };
      };
    };
  };
}
