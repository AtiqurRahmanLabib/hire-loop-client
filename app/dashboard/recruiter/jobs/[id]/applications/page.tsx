import { ArrowLeftIcon, CalendarClockIcon, MapPinIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import ApplicationsTable from "./applications-table"
import { getApplicationsForJob } from "@/lib/actions/application"
import { getUsers } from "@/lib/actions/users"
import { getJobById } from "@/lib/api/jobs"
import { buildJobApplicants } from "@/lib/applications"
import { getJobStatus } from "@/lib/jobStatus"
import type { ApplicationJobSummary } from "@/types/application"
import type { JobRow } from "@/app/dashboard/recruiter/jobs/page"

export const dynamic = "force-dynamic"

function locationLabel(job: JobRow): string {
  if (job.isRemote) {
    return job.location ? `Remote (${job.location})` : "Remote"
  }
  return job.location || "On-site"
}

function deadlineLabel(deadline: string): string {
  if (!deadline) return "No deadline"
  const date = new Date(deadline)
  if (Number.isNaN(date.getTime())) return deadline

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function toSummary(job: JobRow): ApplicationJobSummary {
  return {
    id: job._id,
    title: job.jobTitle,
    company: job.companyName,
    location: locationLabel(job),
    jobType: job.jobType,
    category: job.category,
    deadlineLabel: deadlineLabel(job.deadline),
    isExpired: getJobStatus(job.deadline) === "Expired",
  }
}

export default async function JobApplicationsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const [job, applications, users] = await Promise.all([
    getJobById(id),
    getApplicationsForJob(id),
    // Names are an enhancement; never fail the page for the user lookup.
    getUsers().catch(() => []),
  ])

  if (!job) notFound()

  const summary = toSummary(job)
  const applicants = buildJobApplicants(applications, users)

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <Link
            href="/dashboard/recruiter/jobs"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" />
            Back to manage jobs
          </Link>

          <p className="mt-4 mb-2 text-xs text-muted-foreground">
            Manage Jobs <span className="mx-1">›</span>
            <span className="text-[#6d5bf5]">Applicants</span>
          </p>

          <h1 className="truncate text-3xl font-semibold text-foreground">
            {summary.title}
          </h1>

          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>{summary.company}</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon className="size-3.5" />
              {summary.location}
            </span>
            <span>{summary.jobType}</span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarClockIcon className="size-3.5" />
              {summary.deadlineLabel}
            </span>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs ${
            summary.isExpired
              ? "bg-muted text-muted-foreground"
              : "bg-emerald-500/10 text-emerald-400"
          }`}
        >
          <span
            className={`size-1.5 rounded-full ${
              summary.isExpired ? "bg-muted-foreground" : "bg-emerald-400"
            }`}
          />
          {summary.isExpired ? "Applications closed" : "Accepting applications"}
        </span>
      </div>

      <ApplicationsTable applicants={applicants} />
    </div>
  )
}
