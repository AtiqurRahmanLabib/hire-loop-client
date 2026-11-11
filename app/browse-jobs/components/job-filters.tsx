"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { JOB_CATEGORIES, JOB_TYPES } from "@/lib/job-options"
import type { Job } from "./job"

type Filters = {
  jobType: string | null
  category: string | null
  isRemote: boolean
}

type JobFiltersProps = {
  /** Current jobs, used to show a count next to each filter option. */
  jobs: Job[]
}

/** One checkbox/radio row inside the filters panel. */
function FilterCheckbox({
  label,
  count,
  checked,
  onChange,
  name,
  value,
  type = "checkbox",
}: {
  label: string
  count?: number
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  value: string
  type?: "checkbox" | "radio"
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm">
      <input
        type={type}
        name={name}
        value={value}
        className="size-4 shrink-0 rounded-lg border-input accent-[#6d5bf5]"
        checked={Boolean(checked)}
        onChange={onChange}
      />
      <span className="flex-1">{label}</span>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">{count}</span>
      )}
    </label>
  )
}

/** Small section heading inside the filters panel. */
function FilterGroup({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2.5">
      <h3 className="text-xs font-semibold tracking-wide text-foreground uppercase">
        {title}
      </h3>
      <div className="space-y-2.5">{children}</div>
    </div>
  )
}

export default function JobFilters({ jobs }: JobFiltersProps) {
  const router = useRouter()
  const [filters, setFilters] = useState<Filters>({
    jobType: null,
    category: null,
    isRemote: false,
  })

  // Counts shown next to each option, computed from the current result set
  const counts = useMemo(() => {
    const jobTypes = new Map<string, number>()
    const categories = new Map<string, number>()
    let remote = 0
    for (const job of jobs) {
      jobTypes.set(job.jobType, (jobTypes.get(job.jobType) ?? 0) + 1)
      categories.set(job.category, (categories.get(job.category) ?? 0) + 1)
      if (job.isRemote) remote += 1
    }
    return { jobTypes, categories, remote }
  }, [jobs])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target
    const params = new URLSearchParams(window.location.search)

    let next: Filters

    if (name === "remoteOnly") {
      // Remote only: true/false
      next = { ...filters, isRemote: checked }

      if (checked) params.set("remoteOnly", "true")
      else params.delete("remoteOnly")
    } else {
      // jobType / category: checked হলে মান সেট, unchecked হলে null
      const key = name as "jobType" | "category"
      next = { ...filters, [key]: checked ? value : null }

      if (checked) params.set(key, value)
      else params.delete(key)
    }

    setFilters(next)

    // Console-এ দেখি
    console.log(name, value, checked)
    const result = [
      next.jobType,
      next.category,
      next.isRemote ? "Remote" : null,
    ]
      .filter(Boolean)
      .join(", ")
    console.log("Result:", result)

    // URL আপডেট
    const queryString = params.toString()
    router.push(
      queryString ? `/browse-jobs?${queryString}` : "/browse-jobs",
      { scroll: false }
    )
  }

  return (
    <aside className="h-fit space-y-5 rounded-xl border border-border bg-card p-5">
      <h2 className="text-lg font-semibold">Filters</h2>

      <FilterGroup title="Job Type">
        {JOB_TYPES.map((type) => (
          <FilterCheckbox
            key={type}
            type="checkbox"
            name="jobType"
            value={type}
            label={type}
            count={counts.jobTypes.get(type) ?? 0}
            checked={filters.jobType === type}
            onChange={handleCheckboxChange}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Category">
        {JOB_CATEGORIES.map((category) => (
          <FilterCheckbox
            key={category}
            type="checkbox"
            name="category"
            value={category}
            label={category}
            count={counts.categories.get(category) ?? 0}
            checked={filters.category === category}
            onChange={handleCheckboxChange}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Location">
        <FilterCheckbox
          name="isRemote"
          value="true"
          label="Remote only"
          count={counts.remote}
          checked={filters.isRemote}
          onChange={handleCheckboxChange}
        />
      </FilterGroup>
    </aside>
  )
}