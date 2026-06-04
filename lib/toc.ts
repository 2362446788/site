import GithubSlugger from "github-slugger";
import { unified } from "unified";
import remarkParse from "remark-parse";
import type { TocItem } from "@/lib/types";

export type { TocItem } from "@/lib/types";

type MarkdownNode = {
  type?: string;
  value?: unknown;
  depth?: unknown;
  children?: MarkdownNode[];
};

function getNodeText(node: MarkdownNode): string {
  if (typeof node.value === "string") {
    return node.value;
  }

  return node.children?.map(getNodeText).join("") ?? "";
}

export function extractToc(content: string): TocItem[] {
  const tree = unified().use(remarkParse).parse(content) as MarkdownNode;
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];

  const visit = (node: MarkdownNode) => {
    if (node.type === "heading" && (node.depth === 2 || node.depth === 3)) {
      const text = getNodeText(node).trim();

      if (text) {
        items.push({
          id: slugger.slug(text),
          text,
          level: node.depth,
        });
      }
    }

    node.children?.forEach(visit);
  };

  visit(tree);

  return items;
}
