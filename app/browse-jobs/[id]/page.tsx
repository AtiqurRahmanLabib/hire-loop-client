import Image from "next/image"
import { notFound } from "next/navigation"
import {
  BanknoteIcon,
  BookmarkIcon,
  BriefcaseBusinessIcon,
  CalendarClockIcon,
  ClockIcon,
  GlobeIcon,
  MapPinIcon,
  TagIcon,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { SiteNavbar } from "@/components/navbar"
import ctaBg from "@/app/assets/cta-bg.png"
import { getJobById } from "@/lib/api/jobs"
import { ApplyButton } from "../components/ApplyButton"

// If you already export a Job type from your project, import it and delete this one.
export type JobData = {
  _id: string
  jobTitle: string
  companyName: string
  category: string
  jobType: string
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  frequency: string
  responsibilities: string
  requirements: string
}

const CARD_CLASS = "rounded-xl border border-border bg-card"

const BULLET_CLASS =
  "mt-[7px] size-1.5 shrink-0 rounded-full bg-muted-foreground/70"

/* ---------- helpers ---------- */

// Turns a multi-line text ("a\nb\nc") into ["a", "b", "c"].
// Also removes leading bullets like "-", "*", "•" or "1.".
function toList(text?: string): string[] {
  if (!text) return []
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, "").trim())
    .filter(Boolean)
}

function formatMoney(value: string): string {
  const n = Number(String(value).replace(/,/g, ""))
  if (Number.isNaN(n)) return value
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n)
}

function formatSalary(job: JobData): string {
  const { minSalary, maxSalary, frequency } = job
  if (!minSalary && !maxSalary) return "Not disclosed"
  const range =
    minSalary && maxSalary
      ? `${formatMoney(minSalary)} - ${formatMoney(maxSalary)}`
      : formatMoney(minSalary || maxSalary)
  return frequency ? `${range} / ${frequency}` : range
}

function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value || "Not set"
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function isExpired(value: string): boolean {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return false
  // Deadline day itself still counts as open.
  date.setHours(23, 59, 59, 999)
  return date.getTime() < Date.now()
}

function formatLocation(job: JobData): string {
  if (job.isRemote) {
    return job.location ? `Remote (${job.location})` : "Remote"
  }
  return job.location || "On-site"
}

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const job = (await getJobById(id)) as JobData | null

  if (!job) notFound()

  const responsibilities = toList(job.responsibilities)
  const requirements = toList(job.requirements)
  const expired = isExpired(job.deadline)

  const stats = [
    { icon: BanknoteIcon, label: "Salary Range", value: formatSalary(job) },
    { icon: MapPinIcon, label: "Location", value: formatLocation(job) },
    { icon: ClockIcon, label: "Job Type", value: job.jobType },
    {
      icon: CalendarClockIcon,
      label: "Deadline",
      value: formatDate(job.deadline),
    },
  ]

  return (
    <div className="bg-[#08080A]">
      <SiteNavbar />
      <main className="mx-auto max-w-6xl space-y-4 bg-[#08080A] p-4 sm:p-6">
        {/* Header */}
        <section
          className={`${CARD_CLASS} flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6`}
        >
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted/40">
              <BriefcaseBusinessIcon className="size-6 text-foreground" />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold text-foreground">
                {job.jobTitle}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                <span>{job.companyName}</span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <TagIcon className="size-4" />
                  {job.category}
                </span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              aria-label="Save job"
              className="flex size-10 items-center justify-center rounded-lg border border-border/60 bg-muted/40 text-muted-foreground transition-colors hover:text-foreground"
            >
              <BookmarkIcon className="size-4.5" />
            </button>
            <ApplyButton expired={expired} job={job} />
          </div>
        </section>

        <div className="grid items-start gap-4 lg:grid-cols-[2fr_1fr]">
          {/* Left column */}
          <div className="min-w-0 space-y-4">
            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className={`${CARD_CLASS} p-4`}>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <stat.icon className="size-4" />
                    <span className="text-[10px] font-medium tracking-wider uppercase">
                      {stat.label}
                    </span>
                  </div>
                  <p
                    title={stat.value}
                    className="mt-2 truncate text-sm font-semibold text-foreground"
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Responsibilities + requirements */}
            <section className={`${CARD_CLASS} space-y-5 p-5 sm:p-6`}>
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">
                  Responsibilities
                </h2>
                {responsibilities.length > 0 ? (
                  <ul className="space-y-3">
                    {responsibilities.map((item, i) => (
                      <li
                        key={`${i}-${item}`}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className={BULLET_CLASS} />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    The employer has not listed responsibilities yet.
                  </p>
                )}
              </div>

              <Separator className="bg-border/60" />

              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">
                  Requirements
                </h2>
                {requirements.length > 0 ? (
                  <ul className="space-y-3">
                    {requirements.map((item, i) => (
                      <li
                        key={`${i}-${item}`}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className={BULLET_CLASS} />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    The employer has not listed requirements yet.
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* Right column — job overview */}
          <aside className={`${CARD_CLASS} space-y-4 p-5`}>
            <h2 className="text-lg font-semibold text-foreground">
              Job Overview
            </h2>
            <div className="overflow-hidden rounded-lg border border-border/60">
              <Image
                // Placeholder image — swap for the company's image later.
                src={ctaBg}
                alt={`${job.companyName} office`}
                className="h-40 w-full object-cover"
              />
            </div>

            <div className="space-y-4 pt-1">
              <OverviewRow label="Company" value={job.companyName} />
              <Separator className="bg-border/60" />
              <OverviewRow label="Category" value={job.category} />
              <Separator className="bg-border/60" />
              <OverviewRow label="Job Type" value={job.jobType} />
              <Separator className="bg-border/60" />
              <OverviewRow
                label="Work Mode"
                value={job.isRemote ? "Remote" : "On-site"}
                icon={job.isRemote ? GlobeIcon : undefined}
              />
              <Separator className="bg-border/60" />
              <OverviewRow
                label="Deadline"
                value={expired ? "Closed" : formatDate(job.deadline)}
              />
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

function OverviewRow({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
        {label}
      </span>
      <span className="flex items-center gap-1.5 text-right text-xs text-foreground">
        {Icon ? <Icon className="size-3.5" /> : null}
        {value}
      </span>
    </div>
  )
}
