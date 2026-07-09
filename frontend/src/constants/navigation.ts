export interface NavItem {
  label: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Solutions', path: '/solutions' },
  { label: 'Notes', path: '/notes' },
  { label: 'Deep Code', path: '/deep-code' },
  { label: 'Blog', path: '/blog' },
  { label: 'Resume', path: '/resume' },
  { label: 'Contact', path: '/contact' }
];
