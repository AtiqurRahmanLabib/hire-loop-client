"use client"

import { BuildingIcon, CalendarIcon, GlobeIcon, MapPinIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { createJob } from "@/lib/actions/jobs"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth-client"

const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Marketing",
  "Product & Project",
]

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"]

const FREQUENCIES = ["per hour", "per day", "per month", "per year"]

export type JobsForm = {
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

const initialForm: JobsForm = {
  jobTitle: "",
  companyName: "HirePulse Network",
  category: "Engineering & Tech",
  jobType: "Full-time",
  isRemote: true,
  location: "New York, USA",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  frequency: "per hour",
  responsibilities: "",
  requirements: "",
}

const ACCENT = "border-[#6d5bf5] bg-[#6d5bf5]/15 text-white"

export default function AddJobsPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const role = session?.user.role
  const [form, setForm] = useState<JobsForm>(initialForm)

  // One generic handler for every text input / textarea — just set `name` on each field
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // For Select / Switch, which don't fire text-like change events
  function update<K extends keyof JobsForm>(key: K, value: JobsForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  // Collects the whole form data in one place (called on publish)
  function collectFormData() {
    return {
      ...form,
      jobTitle: form.jobTitle.trim(),
      responsibilities: form.responsibilities.trim(),
      requirements: form.requirements.trim(),
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = collectFormData()
    console.log("Job form data:", data)
    toast.success("Job listing published!")
    setForm(initialForm)
    const result = await createJob(data)
    console.log(result)
    if (result.insertedId) {
      router.push(`/dashboard/${role}/jobs`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="mb-2 flex flex-wrap items-center text-xs text-muted-foreground">
            <Link href={`/dashboard/recruiter/jobs`}> Manage Jobs </Link>{" "}
            <span className="mx-1">›</span>
            <span className="text-[#6d5bf5]">Create New Listing</span>
          </p>
          <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Post a New Job
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill in the position specifications to attract qualified talent
            across our network.
          </p>
        </div>
        <Button
          type="submit"
          className="hidden h-10 gap-2 rounded-lg bg-[#6d5bf5] px-5 text-white hover:bg-[#5c4ae3] sm:inline-flex"
        >
          Publish Job →
        </Button>
      </div>

      <div className="space-y-6">
        {/* 1. Basic Information */}
        <section className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
          <h2 className="text-sm font-semibold">
            <span className="text-[#6d5bf5]">* 1.</span> Basic Information
          </h2>

          <div className="space-y-1.5">
            <Label htmlFor="jobTitle">
              Job Title <span className="text-[#6d5bf5]">*</span>
            </Label>
            <Input
              id="jobTitle"
              name="jobTitle"
              required
              placeholder="Frontend Developer"
              className="h-10"
              value={form.jobTitle}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="min-w-0 space-y-1.5">
              <Label htmlFor="companyName">
                Company Name <span className="text-[#6d5bf5]">*</span>
              </Label>
              <div className="relative">
                <BuildingIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="companyName"
                  name="companyName"
                  required
                  className="h-10 pl-8"
                  value={form.companyName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="min-w-0 space-y-1.5">
              <Label>
                Job Category <span className="text-[#6d5bf5]">*</span>
              </Label>
              <Select
                items={JOB_CATEGORIES.map((label) => ({ value: label, label }))}
                value={form.category}
                onValueChange={(value) => update("category", value as string)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {JOB_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>
              Job Type <span className="text-[#6d5bf5]">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {JOB_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => update("jobType", type)}
                  className={`h-11 rounded-lg border px-3 text-sm transition-colors sm:h-10 ${
                    form.jobType === type
                      ? ACCENT
                      : "border-border bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Location, Compensation & Timeline */}
        <section className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
          <h2 className="text-sm font-semibold">
            <span className="text-[#6d5bf5]">* 2.</span> Location, Compensation
            &amp; Timeline
          </h2>

          <div className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-muted/30 p-3 sm:gap-4 sm:p-3.5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <GlobeIcon className="size-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium">
                  Remote Work Allowed (IsRemote)
                </p>
                <p className="text-xs text-muted-foreground">
                  Enable worldwide or distributed candidate applications
                </p>
              </div>
            </div>
            <Switch
              className="shrink-0"
              checked={form.isRemote}
              onCheckedChange={(checked) =>
                update("isRemote", checked as boolean)
              }
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="min-w-0 space-y-1.5">
              <Label htmlFor="location">Job Location (location)</Label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="location"
                  name="location"
                  className="h-10 pl-8"
                  value={form.location}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="min-w-0 space-y-1.5">
              <Label htmlFor="deadline">Application Deadline (deadline)</Label>
              <div className="relative">
                <CalendarIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  className="h-10 pl-8"
                  value={form.deadline}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="min-w-0 space-y-1.5">
              <Label htmlFor="minSalary">Min Salary / Rate</Label>
              <Input
                id="minSalary"
                name="minSalary"
                type="number"
                min="0"
                placeholder="€ 25"
                className="h-10"
                value={form.minSalary}
                onChange={handleChange}
              />
            </div>
            <div className="min-w-0 space-y-1.5">
              <Label htmlFor="maxSalary">Max Salary / Rate</Label>
              <Input
                id="maxSalary"
                name="maxSalary"
                type="number"
                min="0"
                placeholder="€ 40"
                className="h-10"
                value={form.maxSalary}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2 min-w-0 space-y-1.5 sm:col-span-1">
              <Label>Frequency</Label>
              <Select
                items={FREQUENCIES.map((label) => ({ value: label, label }))}
                value={form.frequency}
                onValueChange={(value) => update("frequency", value as string)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {FREQUENCIES.map((frequency) => (
                    <SelectItem key={frequency} value={frequency}>
                      {frequency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* 3. Responsibilities & Requirements */}
        <section className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
          <h2 className="text-sm font-semibold">
            <span className="text-[#6d5bf5]">* 3.</span> Responsibilities &amp;
            Requirements
          </h2>

          <div className="space-y-1.5">
            <Label htmlFor="responsibilities">
              Key Responsibilities <span className="text-[#6d5bf5]">*</span>
            </Label>
            <Textarea
              id="responsibilities"
              name="responsibilities"
              required
              rows={5}
              className="min-h-24"
              placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences..."
              value={form.responsibilities}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="requirements">
              Qualifications &amp; Requirements{" "}
              <span className="text-[#6d5bf5]">*</span>
            </Label>
            <Textarea
              id="requirements"
              name="requirements"
              required
              rows={5}
              className="min-h-24"
              placeholder={
                "• 3+ years of experience with React, TypeScript...\n• Solid understanding of DOM performance...\n• Experience partnering closely with product teams and UI/UX designers"
              }
              value={form.requirements}
              onChange={handleChange}
            />
          </div>
        </section>
      </div>

      {/* Mobile-only sticky Publish button */}
      <div className="sticky bottom-0 -mx-4 mt-6 border-t border-border bg-background/95 p-4 backdrop-blur sm:hidden">
        <Button
          type="submit"
          className="h-11 w-full rounded-lg bg-[#6d5bf5] text-white hover:bg-[#5c4ae3]"
        >
          Publish Job →
        </Button>
      </div>
    </form>
  )
}
