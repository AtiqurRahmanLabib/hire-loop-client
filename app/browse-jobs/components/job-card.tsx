"use client"

import { BanknoteIcon, BookmarkIcon, ClockIcon, GlobeIcon } from "lucide-react"
import { CATEGORY_STYLES, DEFAULT_CATEGORY_STYLE } from "@/lib/job-options"
import { compensationLabel, locationLabel, type Job } from "./job"

const PILL_CLASS =
  "inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground"

type JobCardProps = { job: Job }

export default function JobCard({ job }: JobCardProps) {
  const category = CATEGORY_STYLES[job.category] ?? DEFAULT_CATEGORY_STYLE
  const CategoryIcon = category.icon

  return (
    <article className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:bg-muted/30">
      {/* Category tile */}
      <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-muted/50">
        <CategoryIcon className={`size-6 ${category.color}`} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold text-foreground">
          {job.jobTitle}
        </h3>
        <p className="mt-0.5 truncate text-sm text-muted-foreground">
          {job.companyName} • {locationLabel(job)}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className={PILL_CLASS}>
            <BanknoteIcon className="size-3.5" />
            {compensationLabel(job)}
          </span>
          <span className={PILL_CLASS}>
            <ClockIcon className="size-3.5" />
            {job.jobType}
          </span>
          {job.isRemote && (
            <span className={PILL_CLASS}>
              <GlobeIcon className="size-3.5" />
              Remote
            </span>
          )}
        </div>
      </div>

      {/* TODO: implement saving jobs (intentionally a no-op) */}
      <button
        type="button"
        onClick={() => {}}
        aria-label={`Save ${job.jobTitle}`}
        className="rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <BookmarkIcon className="size-5" />
      </button>
    </article>
  )
}
