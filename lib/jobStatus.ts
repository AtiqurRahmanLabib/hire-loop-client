export type JobStatus = "Active" | "Expired"

export function getJobStatus(deadline: string): JobStatus {
  if (!deadline) return "Active"
  // deadline এর দিনের শেষ পর্যন্ত Active থাকবে
  const end = new Date(`${deadline}T23:59:59`)
  return end >= new Date() ? "Active" : "Expired"
}