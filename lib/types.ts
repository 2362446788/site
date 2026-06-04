import type { LucideIcon } from 'lucide-react';

export type SiteQuote = {
  body: string[];
  from: string;
};

export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  email: string;
  quote: SiteQuote;
};

export type SectionItem = {
  title: string;
  label: string;
  icon: LucideIcon;
};

export type NavItem = {
  href: string;
  label: string;
};

export type StatItem = {
  label: string;
  value: number | string;
};

export type ProjectIconName = 'monitor' | 'gamepad2';

export type ProjectTone = 'brand' | 'green' | 'blue';

export type ProjectItem = {
  title: string;
  type: string;
  status: string;
  description: string;
  iconName: ProjectIconName;
  tone: ProjectTone;
  href?: string;
};

export type MomentItem = {
  text: string;
  date: string;
  location?: string;
};

export type SocialLinkItem = {
  label: string;
  href: string;
  color: string;
};

export type PostMeta = {
  id: string;
  slug: string;
  title: string;
  category: string;
  draft: boolean;
  recommend: boolean;
  publishedAt: string;
  updatedAt: string;
  publishedLabel: string;
  date: string;
  excerpt: string;
  readingTime: number;
};

export type Post = PostMeta & {
  content: string;
};

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};
