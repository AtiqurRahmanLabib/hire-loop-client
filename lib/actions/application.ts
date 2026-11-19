import type {
  ApplicationPayload,
  ApplicationRecord,
  ApplyResponse,
  GetApplicationsResponse,
} from "@/types/application"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const applyToAJob = async (
  application: ApplicationPayload
): Promise<ApplyResponse> => {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(application),
  })

  if (!res.ok) {
    throw new Error(`Application failed: ${res.status} ${await res.text()}`)
  }

  return res.json()
}

export const getApplications = async (
  query = ""
): Promise<GetApplicationsResponse> => {
  const res = await fetch(`${BASE_URL}/applications?${query}`)
  return res.json()
}

export const getApplicationsCount = async (
  query = ""
): Promise<{ count: number }> => {
  const res = await fetch(`${BASE_URL}/applications/count?${query}`)
  return res.json()
}

/**
 * Applications for one job. The API currently ignores the `jobId` query
 * parameter, so the result is filtered defensively before it reaches the UI.
 */
export const getApplicationsForJob = async (
  jobId: string
): Promise<ApplicationRecord[]> => {
  const result = await getApplications(`jobId=${encodeURIComponent(jobId)}`)
  const list = Array.isArray(result) ? result : (result.data ?? [])

  return list.filter((application) => String(application.jobId) === jobId)
}

export const updateApplications = async (
  id: string,
  data: { status: string }
) => {
  const res = await fetch(`${BASE_URL}/applications/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  })
  return res.json()
}
