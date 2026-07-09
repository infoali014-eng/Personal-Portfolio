import { z } from 'zod';

export const ProjectSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  overview: z.string().min(1, 'Overview is required'),
  problem: z.string().optional(),
  solution: z.string().optional(),
  features: z.array(z.string()).default([]),
  githubUrl: z.string().url().optional().or(z.literal('')),
  demoUrl: z.string().url().optional().or(z.literal(''))
});

export const SolutionSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  overview: z.string().min(1, 'Overview is required'),
  audience: z.string().min(1, 'Audience is required'),
  version: z.string().default('1.0.0'),
  features: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([])
});

export const NoteSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  fileType: z.string().default('PDF'),
  readingTime: z.string().min(1, 'Reading duration is required'),
  youtubeUrl: z.string().url().optional().or(z.literal('')),
  youtubeTitle: z.string().optional()
});

export const ArticleSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Markdown content is required')
});

export const MessageSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().optional(),
  category: z.enum(['projects', 'community', 'guidance', 'consulting', 'general']),
  message: z.string().min(1, 'Message text is required')
});
