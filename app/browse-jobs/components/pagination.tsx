"use client"

import { useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

type PaginationProps = { pageCount: number }

/** Builds the page-number list, collapsing gaps into an "…" marker. */
function pageItems(current: number, count: number): (number | "ellipsis")[] {
  const items: (number | "ellipsis")[] = []
  for (let page = 1; page <= count; page++) {
    if (page === 1 || page === count || Math.abs(page - current) <= 1) {
      items.push(page)
    } else if (items[items.length - 1] !== "ellipsis") {
      items.push("ellipsis")
    }
  }
  return items
}

export default function Pagination({ pageCount }: PaginationProps) {
  const [page, setPage] = useState(1)

  if (pageCount <= 1) return null

  // TODO: Trigger the jobs query when the page changes (no-op for now)
  function handlePageChange() {}

  return (
    <nav
      aria-label="Jobs pagination"
      className="flex items-center justify-center gap-1.5"
    >
      <Button
        variant="outline"
        size="icon"
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => {
          setPage((p) => Math.max(1, p - 1))
          handlePageChange()
        }}
      >
        <ChevronLeftIcon className="size-4" />
      </Button>

      {pageItems(page, pageCount).map((item) =>
        item === "ellipsis" ? (
          <span key={`ellipsis-${item}`} className="px-1 text-muted-foreground">
            …
          </span>
        ) : (
          <Button
            key={item}
            variant="outline"
            size="icon"
            aria-label={`Page ${item}`}
            aria-current={item === page ? "page" : undefined}
            className={
              item === page ? "border-transparent bg-white text-black" : ""
            }
            onClick={() => {
              setPage(item)
              handlePageChange()
            }}
          >
            {item}
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="icon"
        aria-label="Next page"
        disabled={page === pageCount}
        onClick={() => {
          setPage((p) => Math.min(pageCount, p + 1))
          handlePageChange()
        }}
      >
        <ChevronRightIcon className="size-4" />
      </Button>
    </nav>
  )
}
