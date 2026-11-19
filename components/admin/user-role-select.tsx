"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  isUserRole,
  USER_ROLE_LABELS,
  USER_ROLES,
  USER_ROLE_STYLES,
} from "@/lib/roles"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/lib/roles"

const ROLE_ITEMS = USER_ROLES.map((role) => ({
  value: role,
  label: USER_ROLE_LABELS[role],
}))

type UserRoleSelectProps = {
  value: UserRole
  onValueChange: (role: UserRole) => void
  disabled?: boolean
  className?: string
  "aria-label"?: string
}

export function UserRoleSelect({
  value,
  onValueChange,
  disabled,
  className,
  "aria-label": ariaLabel,
}: UserRoleSelectProps) {
  const label = USER_ROLE_LABELS[value]

  return (
    <Select
      items={ROLE_ITEMS}
      value={value}
      disabled={disabled}
      onValueChange={(next) => {
        if (isUserRole(next)) onValueChange(next)
      }}
    >
      <SelectTrigger
        size="sm"
        aria-label={ariaLabel ?? `Change role (currently ${label})`}
        className={cn(
          "h-7 w-32 justify-between rounded-full px-3 text-xs font-medium",
          USER_ROLE_STYLES[value],
          className
        )}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent align="end">
        {USER_ROLES.map((role) => (
          <SelectItem key={role} value={role}>
            {USER_ROLE_LABELS[role]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
