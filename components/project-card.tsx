"use client";

import type { KeyboardEvent } from "react";
import { Gamepad2, Monitor } from "lucide-react";
import type { ProjectItem } from "@/lib/types";
import { openLink } from "@/utils/open-link";

const toneClasses = {
  brand: "bg-ui-brand-subtle text-ui-brand",
  green: "bg-ui-green-subtle text-ui-green",
  blue: "bg-ui-blue-subtle text-ui-blue",
};

const iconMap = {
  monitor: Monitor,
  gamepad2: Gamepad2,
} as const;

type ProjectCardProps = {
  project: ProjectItem;
  titleClassName: string;
  descriptionClassName: string;
  badgeClassName: string;
  cardClassName: string;
  iconClassName: string;
};

export function ProjectCard({
  project,
  titleClassName,
  descriptionClassName,
  badgeClassName,
  cardClassName,
  iconClassName,
}: ProjectCardProps) {
  const Icon = iconMap[project.iconName];

  const handleOpen = () => {
    if (!project.href) {
      return;
    }

    openLink(project.href);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!project.href) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpen();
    }
  };

  return (
    <article
      onClick={project.href ? handleOpen : undefined}
      onKeyDown={project.href ? handleKeyDown : undefined}
      role={project.href ? "link" : undefined}
      tabIndex={project.href ? 0 : undefined}
      className={cardClassName}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={`${iconClassName} ${
            toneClasses[project.tone as keyof typeof toneClasses]
          }`}
        >
          <Icon size={20} strokeWidth={1.5} />
        </div>
        <span className={badgeClassName}>
          {project.type} · {project.status}
        </span>
      </div>
      <h3 className={titleClassName}>{project.title}</h3>
      <p className={descriptionClassName}>{project.description}</p>
    </article>
  );
}
