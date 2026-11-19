import { toApplicationStatus } from "@/lib/application-status"
import type { ApplicationRecord, JobApplicant } from "@/types/application"
import type { UserRecord } from "@/types/user"

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
})

function toTimestamp(value: ApplicationRecord["appliedAt"]): number {
  if (!value) return 0
  const date = value instanceof Date ? value : new Date(value)
  const time = date.getTime()
  return Number.isNaN(time) ? 0 : time
}

/** Older records have no date; Mongo ObjectIds encode their creation time. */
function timestampFromObjectId(id: string | undefined): number {
  if (!id || !/^[0-9a-f]{24}$/i.test(id)) return 0
  return Number.parseInt(id.slice(0, 8), 16) * 1000
}

function formatDate(timestamp: number): string {
  return timestamp > 0 ? dateFormatter.format(timestamp) : "—"
}

function displayName(user: UserRecord | undefined, email: string): string {
  const name = user?.name?.trim()
  if (name) return name

  const localPart = email.split("@")[0]?.trim()
  return localPart || "Applicant"
}

/**
 * Joins application records with their user documents and normalizes the
 * fields the recruitment table needs. Newest applications come first.
 */
export function buildJobApplicants(
  records: ApplicationRecord[],
  users: UserRecord[] = []
): JobApplicant[] {
  const usersById = new Map<string, UserRecord>()
  for (const user of users) {
    const id = user._id ?? user.id
    if (id) usersById.set(String(id), user)
  }

  return records
    .map((record, index) => {
      const user = record.userId
        ? usersById.get(String(record.userId))
        : undefined
      const email = record.email ?? user?.email ?? ""
      const recordId = record._id ?? record.id
      const appliedAt =
        toTimestamp(record.appliedAt ?? record.createdAt) ||
        timestampFromObjectId(recordId)

      return {
        id: String(recordId ?? `application-${index}`),
        userId: String(record.userId ?? ""),
        name: displayName(user, email),
        email,
        status: toApplicationStatus(record.status),
        appliedAt,
        appliedAtLabel: formatDate(appliedAt),
      }
    })
    .sort((a, b) => b.appliedAt - a.appliedAt)
}
