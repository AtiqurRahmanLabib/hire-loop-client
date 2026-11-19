import type { UserRole } from "@/lib/roles"

/** A user row ready for display in the admin users table. */
export type AdminUserRow = {
  id: string
  name: string
  email: string
  image: string | null
  role: UserRole
  emailVerified: boolean
  banned: boolean
  joinedAtLabel: string
}
