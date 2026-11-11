"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SORT_OPTIONS = [
  "Most Recent",
  "Oldest First",
  "Salary: High to Low",
  "Salary: Low to High",
]

export default function JobSortSelect() {
  const [sort, setSort] = useState(SORT_OPTIONS[0])

  // TODO: Trigger the jobs query when the sort option changes (no-op for now)
  function handleSortChange() {}

  return (
    <label className="flex items-center gap-2 text-sm text-muted-foreground">
      Sort by:
      <Select
        items={SORT_OPTIONS.map((option) => ({ value: option, label: option }))}
        value={sort}
        onValueChange={(value) => {
          setSort(value as string)
          handleSortChange()
        }}
      >
        <SelectTrigger className="h-8 rounded-lg">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  )
}
