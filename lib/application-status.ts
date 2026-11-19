import type { ApplicationStatus } from "@/types/application"

/** Canonical application statuses, in pipeline order. */
export const APPLICATION_STATUSES = [
  "Applied",
  "Review",
  "Shortlisted",
  "Rejected",
  "Offered",
] as const satisfies readonly ApplicationStatus[]

/** Badge color per status. Shared by the seeker and recruiter dashboards. */
export const APPLICATION_STATUS_STYLES: Record<ApplicationStatus, string> = {
  Applied: "border-zinc-700 bg-zinc-800 text-zinc-300",
  Review: "border-amber-500/40 bg-amber-500/15 text-amber-500",
  Shortlisted: "border-blue-500/40 bg-blue-500/15 text-blue-400",
  Rejected: "border-red-500/40 bg-red-500/15 text-red-500",
  Offered: "border-emerald-500/40 bg-emerald-500/15 text-emerald-500",
}

export function isApplicationStatus(
  value: unknown
): value is ApplicationStatus {
  return (
    typeof value === "string" &&
    (APPLICATION_STATUSES as readonly string[]).includes(value)
  )
}

/** Normalizes whatever the API returned into a known status. */
export function toApplicationStatus(value: unknown): ApplicationStatus {
  return isApplicationStatus(value) ? value : "Applied"
}
