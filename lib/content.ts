import { BookOpen, Coffee, Mail, Sprout, UserRound } from 'lucide-react';
import { GithubMark } from '@/components/icons/github-mark';
import type {
  FooterVisibilityConfig,
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
  FooterVisibilityConfig,
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

export const aboutPage = {
  title: '关于我',
  description: '关于 Tao、正在做的事情，以及这个数字花园为什么存在。',
  introHeading: '你好，我是 Tao',
  introLabel: 'About Me',
  intro: [
    '我是 Tao，主要做前端开发，也持续关注 AI 动态，目前专注于 Agent 应用开发。',
    '这个站点更像一块缓慢生长的记录地：一部分是技术写作，一部分是 AI 时代下的角色调整，还有一部分记录生活与思考的边角。',
    '我偏爱安静、低噪声、能长期维护的产品体验，所以这里的页面、内容组织和视觉风格，也都会朝着这个方向持续打磨。',
  ],
  sections: [
    {
      label: 'In Progress',
      iconKey: 'pencil',
      heading: '现在在做什么',
      body: '持续整理个人作品站，补齐写作流、内容索引、部署体验和移动端阅读细节；同时也在持续的打磨 Agent 应用，拥抱这个快速发展的 AI 时代，在这片浪潮中稳住身形。',
    },
    {
      label: 'Focus',
      iconKey: 'signpost',
      heading: '关注的方向',
      body: '前端工程与交互体验：构建清晰、稳定、可维护的 Web 应用。AI Agent 应用开发：探索大模型、工具调用、工作流和用户界面的结合方式。个人产品与效率工具：把自己的想法做成可使用、可迭代、可展示的真实项目。',
    },
    {
      label: 'Why This Site',
      iconKey: 'bubbles',
      heading: '网站的初衷',
      body: '想给自己的经验、想法和阶段性作品留一个耐读、可检索、能慢慢变厚的地方，而不是让它们散落在聊天记录和临时笔记里。',
    },
  ],
};

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
  { label: '关于我', href: '/about', color: '#587d54', icon: UserRound },
  { label: 'GitHub', href: 'https://github.com/2362446788', color: '#6e7681', icon: GithubMark },
  { label: '写邮件', href: `mailto:${site.email}`, color: '#d44638', icon: Mail },
];

export const footerVisibilityConfig: FooterVisibilityConfig = {
  exact: [],
  prefix: [],
};
