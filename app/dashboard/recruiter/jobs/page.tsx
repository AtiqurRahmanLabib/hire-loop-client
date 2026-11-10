import {
  BoxesIcon,
  BriefcaseIcon,
  CodeIcon,
  EllipsisVerticalIcon,
  GlobeIcon,
  MapPinIcon,
  MegaphoneIcon,
  PencilIcon,
  PenToolIcon,
  UsersIcon,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { JobsForm } from "../addJobs/page"
import { getJobs } from "@/lib/api/jobs"
import { AlertDialoge } from "@/app/components/AlertDialog"

/**
 * A table row = the job data we collect from the addJobs form (JobsForm)
 * plus the extra listing metadata (applicants, status, posted date).
 */
export type JobRow = JobsForm & {
  _id: string
  applicants: number
  status: "Active" | "Expired"
  posted: string
}

// Display helpers — all formatted straight from the JobsForm fields

function compensation(job: JobsForm) {
  const unit = job.frequency.replace("per ", "")
  if (unit === "year") {
    return `€${job.minSalary}k – €${job.maxSalary}k / yr`
  }
  return `€${job.minSalary} – €${job.maxSalary} / ${unit}`
}

function locationLabel(job: JobsForm) {
  return job.isRemote ? `Remote (${job.location})` : job.location
}

function deadlineLabel(job: JobsForm) {
  return new Date(job.deadline).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

// Small tile per category: icon + color
const categoryStyles: Record<
  string,
  { icon: React.ElementType; color: string }
> = {
  "Engineering & Tech": { icon: CodeIcon, color: "text-indigo-300" },
  "Design & Creative": { icon: PenToolIcon, color: "text-orange-400" },
  Marketing: { icon: MegaphoneIcon, color: "text-rose-300" },
  "Product & Project": { icon: BoxesIcon, color: "text-teal-300" },
}

function CategoryBadge({ category }: { category: string }) {
  const style = categoryStyles[category] ?? {
    icon: BriefcaseIcon,
    color: "text-muted-foreground",
  }
  const Icon = style.icon
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted/50">
      <Icon className={`size-4 ${style.color}`} />
    </div>
  )
}

const thClass =
  "px-4 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase whitespace-nowrap"
const tdClass = "px-4 py-4 align-middle whitespace-nowrap"

export default async function ManageJobsPage() {
  const jobs: JobRow[] = await getJobs()
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs text-muted-foreground">
            Manage Jobs <span className="mx-1">›</span>
            <span className="text-[#6d5bf5]">Job Listings &amp; Posts</span>
          </p>
          <h1 className="text-3xl font-semibold text-foreground">
            Manage Job Posts
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/dashboard/recruiter/addJobs" />}
          className="h-10 gap-2 rounded-lg bg-[#6d5bf5] px-5 text-white hover:bg-[#5c4ae3]"
        >
          + New Job Post
        </Button>
      </div>

      {/* Responsive table: scrolls horizontally on small screens */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-240 border-collapse">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className={thClass}>Job Title &amp; Dept</th>
              <th className={thClass}>Company &amp; Location</th>
              <th className={thClass}>Type</th>
              <th className={thClass}>Compensation</th>
              <th className={thClass}>Applicants</th>
              <th className={thClass}>Status</th>
              <th className={thClass}>Deadline</th>
              <th className={`${thClass} text-right`}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {jobs.map((job) => {
              const active = job.status === "Active"
              return (
                <tr
                  key={job._id}
                  className="transition-colors hover:bg-muted/30"
                >
                  {/* Job title & dept */}
                  <td className={tdClass}>
                    <div className="flex items-center gap-3">
                      <CategoryBadge category={job.category} />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {job.jobTitle}
                        </p>
                        <p
                          className={`text-xs ${categoryStyles[job.category]?.color ?? "text-muted-foreground"}`}
                        >
                          {job.category}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Company & location */}
                  <td className={tdClass}>
                    <p className="text-sm font-medium text-foreground">
                      {job.companyName}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      {job.isRemote ? (
                        <GlobeIcon className="size-3.5" />
                      ) : (
                        <MapPinIcon className="size-3.5" />
                      )}
                      {locationLabel(job)}
                    </p>
                  </td>

                  {/* Type */}
                  <td className={tdClass}>
                    <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                      {job.jobType}
                    </span>
                  </td>

                  {/* Compensation — built from minSalary / maxSalary / frequency */}
                  <td className={`${tdClass} text-sm text-foreground`}>
                    {compensation(job)}
                  </td>

                  {/* Applicants */}
                  <td className={tdClass}>
                    <div className="flex items-center gap-2 text-sm font-medium text-[#6d5bf5]">
                      <UsersIcon className="size-4" />
                      {job.applicants} Candidates
                    </div>
                  </td>

                  {/* Status */}
                  <td className={tdClass}>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs ${
                        active
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          active ? "bg-emerald-400" : "bg-muted-foreground"
                        }`}
                      />
                      {job.status}
                    </span>
                  </td>

                  {/* Deadline */}
                  <td className={tdClass}>
                    <p className="text-sm text-foreground">
                      {deadlineLabel(job)}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {job.posted}
                    </p>
                  </td>

                  {/* Actions */}
                  <td className={`${tdClass} text-right`}>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        nativeButton={false}
                        size="sm"
                        variant="secondary"
                        render={<Link href="/dashboard/recruiter/addJobs" />}
                        className="gap-1.5 rounded-md bg-[#6d5bf5]/90 text-white hover:bg-[#5c4ae3]"
                      >
                        <PencilIcon className="size-3.5" />
                        Update
                      </Button>
                      {/* <Button
                        size="icon"
                        variant="ghost"
                        className="text-muted-foreground hover:text-destructive"
                      > */}
                      <AlertDialoge job={job} />
                      {/* </Button> */}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-muted-foreground"
                        aria-label={`More options for ${job.jobTitle}`}
                      >
                        <EllipsisVerticalIcon className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
