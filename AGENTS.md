# AGENTS.md

本文件面向后续在这个仓库里协作的编码代理、自动化工具和维护者。目标是让改动尽量顺着当前项目结构走，不引入不必要的重构。

## 项目定位

这是一个基于 Next.js App Router 的个人博客与作品站：

- 文稿内容源来自 `content/posts/*.md`
- 站点静态配置主要在 `lib/content.ts`
- 文章读取、前置元信息派生在 `lib/posts.ts`
- 目录提取在 `lib/toc.ts`

当前重点是：

- 阅读体验
- 移动端适配
- Markdown 写作流
- 简洁、低噪声的视觉风格

## 开发环境

- Node.js: 24
- pnpm: 10.33.2

开始工作前建议确认：

```bash
nvm use 24
pnpm -v
node -v
```

常用命令：

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
pnpm format
pnpm format:check
```

## 目录约定

### 路由层

- `app/`：Next.js 页面与 route handlers
- `app/page.tsx`：首页
- `app/posts/page.tsx`：文稿列表
- `app/posts/[slug]/page.tsx`：文稿详情
- `app/projects/page.tsx`：项目页
- `app/timeline/page.tsx`：时间轴页
- `app/rss.xml/route.ts`：RSS 输出
- `app/sitemap.xml/route.ts`：sitemap 输出

### 组件层

- `components/` 放可复用 UI 组件
- 不要把纯页面结构硬塞进 `components/`，组件应当具备复用价值

### 数据与内容层

- `content/posts/`：Markdown 原文
- `lib/posts.ts`：文章读取、排序、推荐、相对时间、阅读时长
- `lib/content.ts`：首页内容配置、导航、项目、时间轴
- `lib/types.ts`：跨文件复用的业务类型

### 工具层

- `utils/`：无业务语义的小工具
- `scripts/`：本地脚本，例如新建文章脚本

## frontmatter 约定

文章 frontmatter 当前使用这些字段：

```yaml
---
id: 'uuid'
title: '文章标题'
category: '技术写作'
draft: false
recommend: false
publishedAt: '2026-06-04'
updatedAt: '2026-06-04'
excerpt: '文章摘要'
---
```

规则：

- `draft: false` 才可见
- `draft: true` 视为隐藏文章
- `recommend: true` 才进入首页推荐区

这些字段不要再手填进 frontmatter：

- `date`
- `readingTime`

它们由 `lib/posts.ts` 在运行时自动计算。

## 修改文章系统时的原则

1. **先改 `lib/posts.ts`，再改页面**
   - 列表、详情、RSS、sitemap 都依赖这里
   - 不要在某一个页面里单独写一份文章过滤逻辑

2. **frontmatter 类型不要过度外泄**
   - `PostFrontmatter` 这种解析过程类型，继续留在 `lib/posts.ts`
   - 只有 `PostMeta` / `Post` 这种跨模块业务类型才放 `lib/types.ts`

3. **推荐逻辑和可见性逻辑保持统一**
   - 首页推荐必须建立在“文章可见”之上
   - 不要让隐藏文章出现在首页、RSS 或 sitemap 中

## Markdown 相关约定

- 文章正文优先使用标准 Markdown / GFM
- 目录只提取 `##` 和 `###`
- 图片引用使用 `public/` 下的绝对路径

建议图片目录：

```text
public/images/posts/<post-id>/
```

## 样式与 UI 约定

- 全局样式在 `app/globals.css`
- 站点风格以低对比、纸张感、轻阴影为主
- Web 与 H5 都要兼顾，不要只看桌面端

滚动条、目录、代码块这类交互区已经做过定制，修改时要注意：

- 桌面端和移动端体验不同
- 不要为了视觉效果破坏滚动可用性

## TypeScript 约定

- 复用业务类型优先从 `lib/types.ts` 引入
- 兼容性导出目前保留在：
  - `lib/content.ts`
  - `lib/posts.ts`
  - `lib/toc.ts`
- 新代码如果没有兼容负担，优先直接从 `@/lib/types` 引类型

## 不建议做的事

- 不要把文章可见性、推荐逻辑散落到多个页面里
- 不要把 `public/` 当作在线上传目录设计
- 不要把本地开发临时数据、试验性脚本直接塞进 `app/`
- 不要为了“目录更整齐”强拆很小的文件

## 验证要求

对代码改动，至少做：

```bash
pnpm lint
pnpm format:check
```

如果改动涉及：

- 页面结构
- Markdown 渲染
- 目录提取
- 路由
- 构建链路

再补：

```bash
pnpm build
```

注意：当前环境下 `pnpm build` 可能因为 Google Fonts 网络失败，这属于环境问题，不一定是代码错误。

## 文档更新原则

如果改了以下内容，请同步更新 `README.md`：

- frontmatter 规范
- 脚本命令
- 目录结构
- 运行环境
- 推荐/草稿逻辑
