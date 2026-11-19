import type { JobRow } from "@/app/dashboard/recruiter/jobs/page"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getJobs = async (query = "") => {
  const res = await fetch(`${BASE_URL}/jobs?${query}`)
  return res.json()
}

export const getJobById = async (jobId: string): Promise<JobRow | null> => {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`)
  if (!res.ok) return null

  // Express sends an empty body for a missing job; guard JSON.parse.
  const body = await res.text()
  return body ? (JSON.parse(body) as JobRow) : null
}
