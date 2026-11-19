import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export type StatCardProps = {
  label: string
  value: number | string
  icon: LucideIcon
  hint?: string
  iconClassName?: string
  hintClassName?: string
  className?: string
}

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  iconClassName,
  hintClassName,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn("rounded-xl border border-border bg-card p-5", className)}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground",
            iconClassName
          )}
        >
          <Icon className="size-4" />
        </span>

        {hint && (
          <span
            className={cn(
              "text-xs font-medium text-muted-foreground",
              hintClassName
            )}
          >
            {hint}
          </span>
        )}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-foreground">{value}</p>
    </div>
  )
}
