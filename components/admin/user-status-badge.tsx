import { cn } from "@/lib/utils"

type UserStatusBadgeProps = {
  banned: boolean
  className?: string
}

export function UserStatusBadge({ banned, className }: UserStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium",
        banned ? "text-red-500" : "text-emerald-500",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full",
          banned ? "bg-red-500" : "bg-emerald-500"
        )}
      />
      {banned ? "Banned" : "Active"}
    </span>
  )
}
