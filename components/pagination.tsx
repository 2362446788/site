import { ChevronLeft, ChevronRight } from "lucide-react";

type PageItem = number | "ellipsis-left" | "ellipsis-right";

type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages?: number;
  totalItems?: number;
  pageSize?: number;
  ariaLabel?: string;
};

function getPaginationItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([
    1,
    totalPages,
    currentPage,
    currentPage - 1,
    currentPage + 1,
  ]);

  if (currentPage <= 3) {
    pages.add(2);
    pages.add(3);
    pages.add(4);
  }

  if (currentPage >= totalPages - 2) {
    pages.add(totalPages - 1);
    pages.add(totalPages - 2);
    pages.add(totalPages - 3);
  }

  const sortedPages = [...pages]
    .filter((pageNumber) => pageNumber >= 1 && pageNumber <= totalPages)
    .sort((a, b) => a - b);

  return sortedPages.flatMap((pageNumber, index) => {
    const previousPage = sortedPages[index - 1];

    if (previousPage && pageNumber - previousPage > 1) {
      return [
        pageNumber > currentPage ? "ellipsis-right" : "ellipsis-left",
        pageNumber,
      ] as PageItem[];
    }

    return [pageNumber];
  });
}

export function Pagination({
  currentPage,
  onPageChange,
  totalPages,
  totalItems,
  pageSize = 10,
  ariaLabel = "分页",
}: PaginationProps) {
  const resolvedTotalPages =
    totalPages ?? (totalItems ? Math.ceil(totalItems / pageSize) : 0);

  if (resolvedTotalPages <= 1) {
    return null;
  }

  const paginationItems = getPaginationItems(currentPage, resolvedTotalPages);

  return (
    <nav
      aria-label={ariaLabel}
      className="mt-16 flex items-center justify-center gap-4 font-mono text-xs text-ui-muted"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="上一页"
        className="flex size-8 items-center justify-center rounded-full transition hover:bg-ui-active hover:text-ui-secondary disabled:pointer-events-none disabled:opacity-25"
      >
        <ChevronLeft size={15} strokeWidth={1.7} />
      </button>

      {paginationItems.map((pageItem) =>
        typeof pageItem === "number" ? (
          <button
            key={pageItem}
            type="button"
            onClick={() => onPageChange(pageItem)}
            aria-current={pageItem === currentPage ? "page" : undefined}
            className={`flex size-8 items-center justify-center rounded-full transition duration-300 ${
              pageItem === currentPage
                ? "bg-ui-active text-ui-primary shadow-ui-subtle"
                : "hover:bg-ui-active hover:text-ui-secondary"
            }`}
          >
            {pageItem}
          </button>
        ) : (
          <span
            key={pageItem}
            aria-hidden="true"
            className="flex size-8 items-center justify-center text-ui-muted/70"
          >
            ...
          </span>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === resolvedTotalPages}
        aria-label="下一页"
        className="flex size-8 items-center justify-center rounded-full transition hover:bg-ui-active hover:text-ui-secondary disabled:pointer-events-none disabled:opacity-25"
      >
        <ChevronRight size={15} strokeWidth={1.7} />
      </button>
    </nav>
  );
}
