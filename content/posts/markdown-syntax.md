---
id: "d1a9ccfb-f291-4164-9eef-aa2df9e203a4"
title: "Markdown 格式完整展示"
category: "技术写作"
draft: false
recommend: true
publishedAt: "2026-05-28"
updatedAt: "2026-05-28"
excerpt: "用于验证博客系统对常见 Markdown 与 GFM 语法的解析和展示效果。"
---

这篇文章用于验证当前博客系统对 Markdown 的支持情况。内容覆盖标题、段落、强调、列表、引用、表格、任务列表、链接、图片、代码块等常用格式。

## 标题层级

Markdown 支持多个标题层级。文章详情页目前主要针对二级标题和三级标题做了专门样式。

### 三级标题

三级标题适合用于拆分小节，比如说明一个配置项、一段实现细节，或者一组相关示例。

#### 四级标题

四级标题也可以被解析，不过当前站点没有为它单独做强样式，显示会更接近普通标题文本。

## 段落与换行

这是一个普通段落。段落之间通过空行分隔，适合写正文叙述。

这是第二个段落。技术文章里建议保持段落短一些，方便移动端阅读，也方便读者快速扫读。

如果只是在一行末尾换行，
Markdown 通常仍会把它合并成同一个段落。

## 强调、加粗、删除线与行内代码

这是 *斜体文本*，这是 **加粗文本**，这是 ***加粗斜体***。

GFM 支持 ~~删除线~~，适合标记废弃方案或修正记录。

行内代码可以写成 `const site = "tao"`，适合放变量名、命令名、文件名和短配置。

## 链接与图片

这是一个普通链接：[Next.js](https://nextjs.org)。

这是一个站内链接：[回到文稿列表](/posts)。

下面是一张 Markdown 图片，用于验证图片渲染、边框和阴影效果。

![站点头像示例](/images/site/avatar.jpg)

## 无序列表

- 阅读体验
- 代码高亮
- 移动端适配
- 暗色模式

## 有序列表

1. 写 Markdown 文件。
2. 补充 frontmatter。
3. 构建文章列表。
4. 渲染文章详情页。

## 嵌套列表

- 内容层
  - Markdown 文件
  - frontmatter 元数据
- 渲染层
  - MDXRemote
  - remark 插件
  - rehype 插件

## 任务列表
- [x] 1234
- [x] 支持 GFM 表格
- [x] 支持代码高亮
- [x] 支持代码块折叠
- [ ] 支持服务端按需复制代码

## 引用

> 技术文章的重点不是堆语法，而是让读者快速理解问题、上下文、取舍和结论。

多段引用也可以这样写：

> 第一段引用内容。
>
> 第二段引用内容，中间用一个空引用行分隔。

## 分割线

下面是一条分割线。

---

分割线之后继续正文。

## 表格

| 能力 | 语法 | 当前状态 |
| --- | --- | --- |
| 表格 | GFM table | 已支持 |
| 删除线 | `~~text~~` | 已支持 |
| 任务列表 | `- [x] task` | 已支持 |
| 代码高亮 | fenced code | 已支持 |

## 代码块

普通 TypeScript 代码块：

```ts
type PostStatus = "draft" | "published";

type PostMeta = {
  id: string;
  title: string;
  status: PostStatus;
  publishedAt: string;
};

function isPublished(post: PostMeta) {
  return post.status === "published";
}
```

带最大高度配置的 TSX 代码块：

```tsx maxHeight=320
import { useMemo, useState } from "react";

type FilterMode = "all" | "published" | "draft";

const posts = [
  { id: "1", title: "写一个博客系统", status: "published" },
  { id: "2", title: "整理 Markdown 能力", status: "draft" },
  { id: "3", title: "优化代码块复制", status: "published" },
];

export function PostFilter() {
  const [mode, setMode] = useState<FilterMode>("all");

  const visiblePosts = useMemo(() => {
    if (mode === "all") {
      return posts;
    }

    return posts.filter((post) => post.status === mode);
  }, [mode]);

  return (
    <section>
      <div>
        <button type="button" onClick={() => setMode("all")}>
          全部
        </button>
        <button type="button" onClick={() => setMode("published")}>
          已发布
        </button>
        <button type="button" onClick={() => setMode("draft")}>
          草稿
        </button>
      </div>

      <ul>
        {visiblePosts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </section>
  );
}
```

Shell 命令代码块：

```bash
pnpm lint
pnpm build
pnpm new-post "新的技术文章" "new-tech-post"
```

JSON 代码块：

```json
{
  "name": "tao-site",
  "type": "blog",
  "features": ["markdown", "mdx", "rss", "sitemap"]
}
```

## HTML

Markdown 中也可以写少量 HTML：

<kbd>Command</kbd> + <kbd>K</kbd>

不过技术博客里不建议大量混用 HTML，除非是 Markdown 无法表达的交互或特殊排版。

## 结论

如果这篇文章能正常展示，说明当前博客系统已经能覆盖大多数技术写作场景。后续可以继续补充目录、脚注、数学公式、Mermaid 图表等更高级能力。
