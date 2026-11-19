import { getApplications } from "@/lib/actions/application"
import { toApplicationStatus } from "@/lib/application-status"
import {
  type Application,
  type ApplicationRecord,
  type IconName,
} from "@/types/application"
import ApplicationsClient from "./applications-client"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const ICON_NAMES: IconName[] = [
  "CodeIcon",
  "PenLineIcon",
  "DatabaseIcon",
  "CloudIcon",
  "BotIcon",
]

// Date থেকে "2 hours ago" ধরনের লেখা বানায়
function timeAgo(value: unknown): string {
  if (!value) return ""
  const date = new Date(value as string | number | Date)
  if (isNaN(date.getTime())) return String(value) // আগেই text থাকলে যেমন আছে তেমন

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  const units: [string, number][] = [
    ["month", 60 * 60 * 24 * 30],
    ["week", 60 * 60 * 24 * 7],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
  ]
  for (const [name, size] of units) {
    const count = Math.floor(seconds / size)
    if (count >= 1) return `${count} ${name}${count > 1 ? "s" : ""} ago`
  }
  return "Just now"
}

// DB-র unknown status/client-এর union-এর বাইরে গেলে fallback
function toIconName(value: string | undefined): IconName {
  return ICON_NAMES.includes(value as IconName)
    ? (value as IconName)
    : "CodeIcon"
}

const ApplicationsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const result = await getApplications(`applicantId=${session?.user.id}`)
  console.log(result)

  // getApplications সরাসরি array দিক বা { data: [...] } দিক, দুইটাই চলবে
  const list: ApplicationRecord[] = Array.isArray(result)
    ? result
    : (result.data ?? [])

  // MongoDB-র ডাটাকে client-এ পাঠানোর উপযোগী (plain object) বানানো
  const applications: Application[] = list.map((app) => ({
    id: String(app._id ?? app.id ?? crypto.randomUUID()),
    jobTitle: app.jobTitle ?? app.title ?? "",
    jobType: app.jobType ?? "",
    location: app.location ?? app.workMode ?? "",
    company: app.company ?? app.company ?? "", // ← এটা যোগ হলো
    appliedAt: timeAgo(app.appliedAt ?? app.createdAt),
    status: toApplicationStatus(app.status),
    icon: toIconName(app.icon),
    archived: Boolean(app.archived),
  }))

  return <ApplicationsClient applications={applications} />
}

export default ApplicationsPage
