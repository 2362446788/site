import type { LucideIcon } from "lucide-react";

type IndexPageHeroProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function IndexPageHero({
  icon: Icon,
  title,
  description,
}: IndexPageHeroProps) {
  return (
    <header className="mb-10 mt-8 flex flex-col items-center text-center">
      <div className="mb-6 flex size-12 items-center justify-center rounded-full bg-ui-active text-ui-brand">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <h1 className="mb-4 font-serif text-3xl tracking-widest text-ui-primary">
        {title}
      </h1>
      <div className="mb-4 h-px w-10 bg-ui-subtle" />
      <p className="max-w-[32rem] font-serif text-[13px] italic tracking-wide text-ui-muted">
        {description}
      </p>
    </header>
  );
}
