export type ApplicationPayload = {
  jobId: string
  jobTitle: string
  companyName: string
  userId: string
  email: string
}

export type ApplyResponse = {
  acknowledged?: boolean
  insertedId?: string
}

export type ApplicationStatus =
  "Applied" | "Review" | "Shortlisted" | "Rejected" | "Offered"

export type IconName =
  "CodeIcon" | "PenLineIcon" | "DatabaseIcon" | "CloudIcon" | "BotIcon"

/** Shape of an application row sent to the client. */
export type Application = {
  id: string
  jobTitle: string
  jobType: string
  location: string
  company: string
  appliedAt: string
  status: ApplicationStatus
  icon: IconName
  archived?: boolean
}

/** Raw application record as returned by the API/MongoDB. */
export type ApplicationRecord = {
  _id?: string
  id?: string
  jobId?: string
  jobTitle?: string
  title?: string
  recruiterId?: string
  userId?: string
  email?: string
  jobType?: string
  location?: string
  workMode?: string
  company?: string
  companyName?: string
  appliedAt?: string | number | Date
  createdAt?: string | number | Date
  status?: string
  icon?: string
  archived?: boolean
}

/** Applicant row prepared for the recruiter applications table. */
export type JobApplicant = {
  id: string
  userId: string
  name: string
  email: string
  status: ApplicationStatus
  /** Sortable timestamp; 0 when the API did not provide a date. */
  appliedAt: number
  appliedAtLabel: string
}

/** Job details shown above the recruiter applications table. */
export type ApplicationJobSummary = {
  id: string
  title: string
  company: string
  location: string
  jobType: string
  category: string
  deadlineLabel: string
  isExpired: boolean
}

/** getApplications may return a bare array or a { data: [...] } wrapper. */
export type GetApplicationsResponse =
  ApplicationRecord[] | { data?: ApplicationRecord[] }
