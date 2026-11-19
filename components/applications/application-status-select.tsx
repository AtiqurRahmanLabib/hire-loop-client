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

const STATUS_ITEMS = APPLICATION_STATUSES.map((status) => ({
  value: status,
  label: status,
}))

type ApplicationStatusSelectProps = {
  value: ApplicationStatus
  onValueChange: (status: ApplicationStatus) => void
  disabled?: boolean
  className?: string
  "aria-label"?: string
}

export function ApplicationStatusSelect({
  value,
  onValueChange,
  disabled,
  className,
  "aria-label": ariaLabel,
}: ApplicationStatusSelectProps) {
  return (
    <Select
      items={STATUS_ITEMS}
      value={value}
      disabled={disabled}
      onValueChange={(next) => {
        if (isApplicationStatus(next)) onValueChange(next)
      }}
    >
      <SelectTrigger
        size="sm"
        aria-label={ariaLabel ?? `Change status (currently ${value})`}
        className={cn("w-36", className)}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {APPLICATION_STATUSES.map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
