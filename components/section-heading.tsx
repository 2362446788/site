import type { LucideIcon } from "lucide-react";

export function SectionHeading({
  title,
  label,
  icon: Icon,
}: {
  title: string;
  label: string;
  icon: LucideIcon;
}) {
  return (
    <div className="group mb-8 flex items-center gap-3">
      <div className="text-ui-brand transition-transform duration-300 group-hover:-rotate-6">
        <Icon size={20} />
      </div>
      <h2 className="font-serif text-xl text-ui-primary">{title}</h2>
      <span className="self-end pb-0.5 font-mono text-xs tracking-wide text-ui-muted">
        {label}
      </span>
    </div>
  );
}
