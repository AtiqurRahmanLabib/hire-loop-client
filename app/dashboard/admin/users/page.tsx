import { getUserByAdmin } from "@/lib/actions/users"
import { isUserRole } from "@/lib/roles"
import UsersView from "./users-view"
import type { AdminUserRow } from "./types"

export const dynamic = "force-dynamic"

const joinedAtFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
})

function formatJoinedAt(value: Date | string | null | undefined) {
  if (!value) return "—"

  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return "—"

  return joinedAtFormatter.format(date)
}

const UsersPage = async () => {
  const { users } = await getUserByAdmin()

  const rows: AdminUserRow[] = users.map((user) => ({
    id: user.id,
    name: user.name?.trim() || "Unnamed user",
    email: user.email ?? "",
    image: user.image ?? null,
    role: isUserRole(user.role) ? user.role : "seeker",
    emailVerified: Boolean(user.emailVerified),
    banned: Boolean(user.banned),
    joinedAtLabel: formatJoinedAt(user.createdAt),
  }))

  return <UsersView users={rows} />
}

export default UsersPage
