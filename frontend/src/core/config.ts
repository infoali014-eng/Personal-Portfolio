export const APP_CONFIG = {
  app: {
    name: 'Ali Portfolio OS',
    version: '1.0.0',
    env: 'development',
    // Toggle between 'mock' and 'supabase' repositories
    backendMode: (import.meta.env.VITE_BACKEND_MODE || 'mock') as 'mock' | 'supabase'
  },
  brand: {
    logoText: 'ALI.OS',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      youtube: 'https://youtube.com'
    }
  },
  seo: {
    defaultTitle: 'Ali | CS Student & AI Builder',
    defaultDescription: 'Portfolio OS - Founder of Deep Code, building tools for educational systems.'
  },
  routes: {
    home: '/',
    about: '/about',
    projects: '/projects',
    solutions: '/solutions',
    notes: '/notes',
    deepCode: '/deep-code',
    blog: '/blog',
    contact: '/contact',
    resume: '/resume',
    admin: '/admin'
  },
  storage: {
    mediaBucket: 'portfolio-assets',
    notesBucket: 'learning-resources-pdfs'
  }
};
