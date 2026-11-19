import { APPLICATION_STATUS_STYLES } from "@/lib/application-status"
import { cn } from "@/lib/utils"
import type { ApplicationStatus } from "@/types/application"

type ApplicationStatusBadgeProps = {
  status: ApplicationStatus
  className?: string
}

export function ApplicationStatusBadge({
  status,
  className,
}: ApplicationStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
        APPLICATION_STATUS_STYLES[status],
        className
      )}
    >
      {status}
    </span>
  )
}
