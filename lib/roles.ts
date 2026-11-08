export const USER_ROLES = ["Seeker", "Recruiter", "Admin"] as const

export type UserRole = (typeof USER_ROLES)[number]
