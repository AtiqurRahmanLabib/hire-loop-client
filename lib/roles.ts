export const USER_ROLES = ["seeker", "recruiter", "admin"] as const

export type UserRole = (typeof USER_ROLES)[number]

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  seeker: "Seeker",
  recruiter: "Recruiter",
  admin: "Admin",
}

/** Shared role pill palette used by the user table and role pickers. */
export const USER_ROLE_STYLES: Record<UserRole, string> = {
  seeker:
    "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/15 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/15",
  recruiter:
    "border-sky-500/25 bg-sky-500/10 text-sky-600 hover:bg-sky-500/15 dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/15",
  admin:
    "border-[#6d5bf5]/30 bg-[#6d5bf5]/10 text-[#5b49e8] hover:bg-[#6d5bf5]/15 dark:bg-[#6d5bf5]/15 dark:text-[#a89bff] dark:hover:bg-[#6d5bf5]/20",
}

export function isUserRole(value: unknown): value is UserRole {
  return (
    typeof value === "string" &&
    (USER_ROLES as readonly string[]).includes(value)
  )
}
