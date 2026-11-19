"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  APPLICATION_STATUSES,
  isApplicationStatus,
} from "@/lib/application-status"
import { cn } from "@/lib/utils"
import type { ApplicationStatus } from "@/types/application"

export type ApplicationStatusFilterValue = ApplicationStatus | "all"

const FILTER_ITEMS = [
  { value: "all", label: "All statuses" },
  ...APPLICATION_STATUSES.map((status) => ({
    value: status,
    label: status,
  })),
]

type ApplicationStatusFilterProps = {
  value: ApplicationStatusFilterValue
  onValueChange: (value: ApplicationStatusFilterValue) => void
  className?: string
}

export function ApplicationStatusFilter({
  value,
  onValueChange,
  className,
}: ApplicationStatusFilterProps) {
  return (
    <Select
      items={FILTER_ITEMS}
      value={value}
      onValueChange={(next) => {
        if (next === "all" || isApplicationStatus(next)) onValueChange(next)
      }}
    >
      <SelectTrigger
        aria-label="Filter applicants by status"
        className={cn("h-9 w-44", className)}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="all">All statuses</SelectItem>
        {APPLICATION_STATUSES.map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
