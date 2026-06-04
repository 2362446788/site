import { BookOpen, Coffee, Sprout } from 'lucide-react';
import type {
  MomentItem,
  NavItem,
  ProjectItem,
  SectionItem,
  SiteConfig,
  SocialLinkItem,
} from '@/lib/types';

export type {
  MomentItem,
  NavItem,
  ProjectItem,
  SectionItem,
  SiteConfig,
  SocialLinkItem,
  SiteQuote,
  StatItem,
  ProjectIconName,
  ProjectTone,
} from '@/lib/types';

export const site: SiteConfig = {
  name: 'Tao',
  title: 'Tao Site',
  description: 'Frontend Developer & Agent Engineer',
  email: '2362446788@qq.com',
  quote: {
    body: ['我步入丛林，因为我希望生活得有意义，', '我希望活得深刻，吸取生命中所有的精华。'],
    from: '梭罗《瓦尔登湖》',
  },
};

export const sections: SectionItem[] = [
  { title: '生长的世界', label: 'Projects & Lab', icon: Sprout },
  { title: '湖畔拾遗', label: 'Recent Posts', icon: BookOpen },
  { title: '林间回音', label: 'Moments', icon: Coffee },
];

export const navItems: NavItem[] = [
  { href: '/', label: '首页' },
  { href: '/posts', label: '文稿' },
  { href: '/timeline', label: '时间轴' },
  { href: '/projects', label: '项目' },
];

// export const stats: StatItem[] = [
//   { label: '篇', value: 12 },
//   { label: '字', value: '38k' },
//   { label: '天', value: 426 },
// ];

export const projects: ProjectItem[] = [
  {
    title: '数字森林重构计划',
    type: '全栈项目',
    status: '个人网站',
    description: '打造一个像纸张一样自由呼吸的极简博客系统，重点是阅读体验、暗色模式和移动端导航。',
    iconName: 'monitor',
    tone: 'brand',
    href: '/projects',
  },
  {
    title: '智能知识库 Agent',
    type: 'Agent 应用',
    status: '智能回复',
    description: '自动精准回答知识库相关内容的 Agent，像真人一样理解你的问题、调用知识库，处理高频咨询场景。',
    iconName: 'gamepad2',
    tone: 'blue',
    href: '/projects',
  },
];

export const moments: MomentItem[] = [
  {
    text: '生日这天，又学到一个人生道理：坦然从容面对生活。',
    date: '2026-06-04',
    location: '深圳',
  },
  {
    text: '一个完整的 Agent 需要涵盖哪些内容？',
    date: '2026-05-25',
    location: '深圳',
  },
  {
    text: '给站点加了一个真正能在手机上舒服使用的底部导航，拇指能碰到的地方才是常用入口。',
    date: '2026-05-20',
    location: '深圳',
  },
];

export const socialLinks: SocialLinkItem[] = [
  { label: 'GitHub', href: 'https://github.com', color: '#6e7681' },
  { label: 'X', href: 'https://x.com', color: '#111827' },
  { label: 'Mail', href: `mailto:${site.email}`, color: '#d44638' },
  { label: 'RSS', href: '/rss.xml', color: '#e88b18' },
];
