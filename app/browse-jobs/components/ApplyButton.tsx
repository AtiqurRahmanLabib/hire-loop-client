"use client"

import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { JobData } from "../[id]/page"
import { toast } from "@/components/ui/toast"
import { applyToAJob, getApplicationsCount } from "@/lib/actions/application"
import type { ApplicationPayload } from "@/types/application"
import { getPremiumUserById } from "@/lib/actions/users"

export function ApplyButton({
  expired,
  job,
}: {
  expired: boolean
  job: JobData
}) {
  const router = useRouter()
  const { data: session } = useSession()
  const user = session?.user

  const handleApply = async () => {
    if (!user) {
      router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`)
      return
    }

    const premiumResult = await getPremiumUserById(user.id)
    console.log(premiumResult)

    // Check user role first
    if (user.role !== "seeker") {
      toast.add({ title: "You are not a job seeker" })
      return
    }

    try {
      // Check application limit
      const countResult = await getApplicationsCount(`applicantId=${user.id}`)

      if (!premiumResult.premium && countResult.count >= 2) {
        router.push("/checkout")
        return
      }

      const application: ApplicationPayload = {
        jobId: job._id,
        jobTitle: job.jobTitle,
        companyName: job.companyName,
        userId: user.id,
        email: user.email,
      }

      const result = await applyToAJob(application)

      if (result.insertedId) {
        toast.add({ title: "Application submitted!" })
        router.push("/")
      }
    } catch (error) {
      toast.add({ title: "Something went wrong" })
      console.error(error)
    }
  }

  return (
    <button
      type="button"
      disabled={expired}
      onClick={handleApply}
      className="h-10 rounded-lg bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {expired ? "Applications closed" : "Apply Now"}
    </button>
  )
}
