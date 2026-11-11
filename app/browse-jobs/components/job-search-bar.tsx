"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type JobSearchBarProps = {
  /** Initial value from the URL, so the input matches the server query. */
  initialSearch?: string
}

export default function JobSearchBar({
  initialSearch = "",
}: JobSearchBarProps) {
  const router = useRouter()
  const [value, setValue] = useState(initialSearch)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // const search = value.trim()
    // router.push(
    //   search
    //     ? `/browse-jobs?search=${encodeURIComponent(search)}`
    //     : "/browse-jobs"
    // )

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    const search = data.searchData
    const params = new URLSearchParams()
    params.set("search", search as string)
    router.push(`/browse-jobs?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl border border-border bg-card p-3 sm:flex-row sm:items-center"
    >
      <div className="relative flex-1">
        <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          name="searchData"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search by job title, keywords..."
          aria-label="Search jobs"
          className="h-11 rounded-lg pl-9"
        />
      </div>
      <Button
        type="submit"
        className="h-11 rounded-lg bg-white px-5 font-medium text-black hover:bg-white/90"
      >
        Search Jobs
      </Button>
    </form>
  )
}
