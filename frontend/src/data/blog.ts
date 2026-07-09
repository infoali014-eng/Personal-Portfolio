export interface BlogArticleData {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: { name: string; avatar: string; role: string };
  date: string;
  readingTime: string;
  toc: { text: string; id: string }[];
  tags: string[];
  series?: { name: string; currentPart: number; totalParts: number; prevSlug?: string; nextSlug?: string };
}

export const BLOG_REGISTRY: Record<string, BlogArticleData> = {
  'typescript-type-safeties': {
    slug: 'typescript-type-safeties',
    title: 'How We Structure TypeScript Type Safeties in Monorepos',
    category: 'Engineering',
    excerpt: 'Detailed outline of strict type checking rules, conditional inference chains, and template literals constraints mapping.',
    content: `
# Introduction to Strict Type Safeties

Structuring modern typescript workspaces requires aligning config files across distinct modules. Without strict boundaries, type declarations bleed between segments, slowing development feedback cycles.

## Configuring tsconfig compiler rules

The foundational setup begins with configuring compiler rules. Ensure your configuration uses strict settings:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "verbatimModuleSyntax": true
  }
}
\`\`\`

## Conditional Inference Mappings

Use conditional types to validate interfaces dynamically:

\`\`\`typescript
type CheckType<T> = T extends string ? "Text" : "Data";
\`\`\`

This ensures robust compilation guarantees across all client wrappers.
`,
    author: { name: 'Ali', avatar: '/assets/avatar.jpg', role: 'Founder of Deep Code' },
    date: '2026-07-05',
    readingTime: '8 min',
    toc: [
      { text: 'Introduction to Strict Type Safeties', id: 'introduction-to-strict-type-safeties' },
      { text: 'Configuring tsconfig compiler rules', id: 'configuring-tsconfig-compiler-rules' },
      { text: 'Conditional Inference Mappings', id: 'conditional-inference-mappings' }
    ],
    tags: ['TypeScript', 'Monorepos', 'Architecture', 'Linting']
  }
};
