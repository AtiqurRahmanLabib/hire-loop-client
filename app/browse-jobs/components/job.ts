import type { JobsForm } from "@/app/dashboard/recruiter/addJobs/page"

/** A job listing as returned by the jobs API. */
export type Job = JobsForm & { _id: string }

/** Number of jobs shown per page in the results list. */
export const PAGE_SIZE = 10

/** "€80k – €120k / yr" style compensation label. */
export function compensationLabel(job: JobsForm) {
  const unit = job.frequency.replace("per ", "")
  if (unit === "year") {
    return `€${job.minSalary}k – €${job.maxSalary}k / yr`
  }
  return `€${job.minSalary} – €${job.maxSalary} / ${unit}`
}

/** "Remote (New York, USA)" / "New York, USA". */
export function locationLabel(job: JobsForm) {
  return job.isRemote ? `Remote (${job.location})` : job.location
}
