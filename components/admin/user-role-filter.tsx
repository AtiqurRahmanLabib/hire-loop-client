"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { isUserRole, USER_ROLE_LABELS, USER_ROLES } from "@/lib/roles"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/lib/roles"

export type UserRoleFilterValue = UserRole | "all"

const FILTER_ITEMS = [
  { value: "all", label: "All roles" },
  ...USER_ROLES.map((role) => ({
    value: role,
    label: USER_ROLE_LABELS[role],
  })),
]

type UserRoleFilterProps = {
  value: UserRoleFilterValue
  onValueChange: (value: UserRoleFilterValue) => void
  className?: string
}

export function UserRoleFilter({
  value,
  onValueChange,
  className,
}: UserRoleFilterProps) {
  return (
    <Select
      items={FILTER_ITEMS}
      value={value}
      onValueChange={(next) => {
        if (next === "all" || isUserRole(next)) onValueChange(next)
      }}
    >
      <SelectTrigger
        aria-label="Filter users by role"
        className={cn("h-9 w-44", className)}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent align="end">
        <SelectItem value="all">All roles</SelectItem>
        {USER_ROLES.map((role) => (
          <SelectItem key={role} value={role}>
            {USER_ROLE_LABELS[role]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
