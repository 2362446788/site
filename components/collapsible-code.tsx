"use client";

import type { CSSProperties, ReactNode } from "react";
import { isValidElement } from "react";
import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Copy } from "lucide-react";

type CollapsibleCodeProps = React.HTMLAttributes<HTMLPreElement> & {
  "data-language"?: string;
  "data-max-height"?: string;
  rawCode?: string;
};

type CodeStyle = CSSProperties & {
  "--code-block-max-height"?: string;
};

function normalizeMaxHeight(value?: string) {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();

  if (/^\d+(\.\d+)?$/.test(trimmed)) {
    return `${trimmed}px`;
  }

  if (/^\d+(\.\d+)?(px|rem|em|vh|svh|lvh|dvh)$/.test(trimmed)) {
    return trimmed;
  }

  return undefined;
}

function getCodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getCodeText).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getCodeText(node.props.children);
  }

  return "";
}

export function CollapsibleCode({
  children,
  className,
  rawCode,
  style,
  ...props
}: CollapsibleCodeProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const language = props["data-language"];
  const maxHeight = normalizeMaxHeight(props["data-max-height"]);
  const codeStyle: CodeStyle = {
    ...style,
    ...(maxHeight ? { "--code-block-max-height": maxHeight } : {}),
  };
  const codeText = rawCode ?? getCodeText(children);

  const copyCode = async () => {
    if (!codeText) {
      return;
    }

    await navigator.clipboard.writeText(codeText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="collapsible-code-panel">
      <div className="collapsible-code-header">
        <span>{language ? language.toUpperCase() : "CODE"}</span>
        <div className="collapsible-code-actions">
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => setExpanded((value) => !value)}
            className="collapsible-code-button"
            aria-expanded={expanded}
          >
            {expanded ? (
              <>
                收起
                <ChevronUp size={13} strokeWidth={1.8} />
              </>
            ) : (
              <>
                展开
                <ChevronDown size={13} strokeWidth={1.8} />
              </>
            )}
          </button>
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={copyCode}
            className={["collapsible-code-button", "collapsible-code-copy", copied ? "is-copied" : ""]
              .filter(Boolean)
              .join(" ")}
            aria-live="polite"
          >
            {copied ? <Check size={13} strokeWidth={2.2} /> : <Copy size={13} strokeWidth={1.8} />}
            {copied ? "已复制" : "复制"}
          </button>
        </div>
      </div>
      <pre
        {...props}
        className={["collapsible-code-pre", !expanded ? "is-collapsed" : "", className]
          .filter(Boolean)
          .join(" ")}
        style={codeStyle}
      >
        {expanded ? children : <code>代码已折叠</code>}
      </pre>
    </div>
  );
}
