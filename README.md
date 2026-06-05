# Site

一个基于 Next.js App Router 的个人博客与作品站，当前包含四类内容：

- 首页
- 文稿
- 项目
- 时间轴

内容源主要来自本地 Markdown 文件，静态资源放在 `public/`，页面数据和站点配置由 `lib/` 统一提供。

## 技术栈

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- pnpm 10
- gray-matter
- next-mdx-remote
- remark-gfm
- rehype-pretty-code
- reading-time

## 环境要求

- Node.js 24
- pnpm 10.33.2

项目已在 `package.json` 中声明：

```json
{
  "packageManager": "pnpm@10.33.2"
}
```

建议本地先切到对应环境：

```bash
nvm use 24
node -v
pnpm -v
```

## 开发命令

安装依赖：

```bash
pnpm install
```

启动开发环境：

```bash
pnpm dev
```

其他常用命令：

```bash
pnpm lint
pnpm build
pnpm format
pnpm format:check
```

## 站点域名配置

站点基地址统一由 `lib/site.ts` 提供，`metadataBase`、`RSS`、`sitemap` 都会读取这份配置。

部署时建议通过环境变量设置：

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

也兼容：

```bash
SITE_URL=https://your-domain.com
```

说明：

- 建议填写完整 `https://` 地址
- 可以不带末尾 `/`
- 如果未设置或格式不合法，会回退到默认值 `https://xzztao.com`

## 目录结构

```text
app/          Next.js 路由、页面、route handlers
components/   复用组件
content/posts Markdown 文稿内容源
lib/          内容读取、配置、TOC、类型
public/       静态资源
scripts/      本地脚本
utils/        小型工具函数
```

关键文件：

- `app/page.tsx`：首页
- `app/about/page.tsx`：关于我页面
- `app/posts/page.tsx`：文稿列表页
- `app/posts/[slug]/page.tsx`：文稿详情页
- `lib/posts.ts`：Markdown 文章读取与文章元数据计算
- `lib/content.ts`：站点配置、首页项目/时间轴等静态内容
- `components/site-footer.tsx`：全局页脚与隐藏规则匹配
- `lib/toc.ts`：正文目录提取
- `lib/types.ts`：跨模块复用的业务类型
- `scripts/new-post.mjs`：新建文章脚本

## 文稿系统

所有文章都放在：

```text
content/posts/*.md
```

### frontmatter 规范

当前文章 frontmatter 使用 YAML，支持这些字段：

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

字段说明：

- `id`：文章唯一标识，详情页路由依赖它
- `title`：文章标题
- `category`：分类，用于列表筛选
- `draft`：
  - `false`：文章可见
  - `true`：文章隐藏，不出现在列表、详情、RSS、sitemap 中
- `recommend`：
  - `true`：出现在首页文稿推荐区
  - `false`：只在文稿列表页可见
- `publishedAt`：发布时间
- `updatedAt`：最近更新时间
- `excerpt`：列表摘要和 RSS 描述

这些字段**不需要手填**：

- `date`：运行时根据 `updatedAt / publishedAt` 自动计算，格式如 `今天 / 昨天 / 3 天前 / 2 周前`
- `readingTime`：运行时基于正文自动计算

### 创建新文章

推荐使用脚本：

```bash
pnpm new-post "文章标题" "file-name"
```

它会自动生成：

- `id`
- 文件名
- frontmatter 基础模板

### 新增一篇文章的完整流程

1. 创建文章骨架：

```bash
pnpm new-post "TypeScript 泛型入门" "typescript-generics"
```

2. 打开生成的文件，例如：

```text
content/posts/typescript-generics.md
```

3. 完善 frontmatter：

```yaml
---
id: '自动生成的 uuid'
title: 'TypeScript 泛型入门'
category: '前端开发'
draft: true
recommend: false
publishedAt: '2026-06-04'
updatedAt: '2026-06-04'
excerpt: '从基础概念到常见用法，快速理解 TypeScript 泛型为什么重要。'
---
```

4. 编写正文 Markdown 内容
5. 本地预览并确认展示效果
6. 准备发布时，把：

```yaml
draft: false
```

如果希望文章进入首页推荐区，再额外设置：

```yaml
recommend: true
```

常见状态组合：

- 草稿文章：

```yaml
draft: true
recommend: false
```

- 已发布但不推荐到首页：

```yaml
draft: false
recommend: false
```

- 已发布且推荐到首页：

```yaml
draft: false
recommend: true
```

### 文章图片

当前不做在线上传，文章图片请手动放在 `public/` 下。

建议目录：

```text
public/images/posts/<post-id>/
```

Markdown 中使用绝对路径引用：

```md
![封面图](/images/posts/<post-id>/cover.webp)
```

## 首页推荐逻辑

首页文稿模块只展示：

- `draft: false`
- `recommend: true`

的文章。

普通文稿列表页展示所有 `draft: false` 的文章。

## 目录与代码块

文稿详情页支持：

- 自动提取 `##` / `###` 生成目录
- 桌面端右侧目录
- 移动端抽屉目录
- 代码块高亮
- 代码块折叠
- 代码复制

如果希望目录结构清晰，正文建议优先使用：

- `##` 作为章节
- `###` 作为小节

## RSS 与 Sitemap

## 页脚显示规则

全局页脚统一在 `components/site-footer.tsx` 渲染，显示与隐藏规则在 `lib/content.ts` 的 `footerVisibilityConfig` 中配置。

支持两种匹配模式：

- `exact`：完全匹配，例如 `"/about"`
- `prefix`：前缀模糊匹配，例如 `"/posts"` 会匹配 `/posts/123`

项目内置：

- `/rss.xml`
- `/sitemap.xml`

它们是给程序读取的 XML 资源，不是面向普通用户的页面。

用途分别是：

- `rss.xml`：博客订阅
- `sitemap.xml`：搜索引擎抓取

## 注意事项

1. 本项目当前使用 Google Fonts。离线或受限网络下，`pnpm build` 可能因为字体请求失败。
2. `public/` 适合固定静态资源，不适合在线上传。
3. `node_modules` 不要跨平台复用；切换系统或 Node 架构后应重新执行 `pnpm install`。

## 后续建议

当前系统已经适合持续写作。后续如果继续扩展，优先级较高的方向是：

- `tags`
- `coverImage`
- 草稿与推荐管理进一步细化
- HTML 站点地图（给人看）
- 文章模板与图片目录脚本化
