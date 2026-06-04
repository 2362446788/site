"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export type SelectorOption = {
  label: string;
  value: string;
};

type SelectorProps = {
  ariaLabel: string;
  label?: string;
  options: SelectorOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function Selector({
  ariaLabel,
  label,
  options,
  value,
  onChange,
  className = "",
}: SelectorProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleSelect = (nextValue: string) => {
    if (nextValue !== value) {
      onChange(nextValue);
    }

    setOpen(false);
  };

  return (
    <div ref={rootRef} className={`selector-root ${className}`.trim()}>
      {label ? <span className="selector-label">{label}</span> : null}
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        className="selector-trigger"
        onClick={() => setOpen((current) => !current)}
      >
        <span className="selector-trigger-text">{selectedOption?.label ?? ""}</span>
        <ChevronDown
          size={15}
          strokeWidth={1.7}
          className={`selector-trigger-icon ${open ? "is-open" : ""}`}
        />
      </button>

      {open ? (
        <div className="selector-menu" role="listbox" aria-label={ariaLabel}>
          {options.map((option) => {
            const active = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={active}
                className={`selector-option ${active ? "is-active" : ""}`}
                onClick={() => handleSelect(option.value)}
              >
                <span className="selector-option-text">{option.label}</span>
                <Check size={15} strokeWidth={1.8} className="selector-option-check" />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
