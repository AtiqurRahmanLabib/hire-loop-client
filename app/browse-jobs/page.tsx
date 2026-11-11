import { getJobs } from "@/lib/api/jobs"
import JobCard from "./components/job-card"
import JobFilters from "./components/job-filters"
import JobSearchBar from "./components/job-search-bar"
import JobSortSelect from "./components/job-sort-select"
import Pagination from "./components/pagination"
import { PAGE_SIZE, type Job } from "./components/job"
import { SiteNavbar } from "@/components/navbar"

export const dynamic = "force-dynamic"

type SearchParams = Record<string, string | string[] | undefined>

/** Flattens searchParams (string | string[] | undefined) into a query string. */
function toQueryString(params: SearchParams) {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const item of value) query.append(key, item)
    } else if (value !== undefined) {
      query.set(key, value)
    }
  }
  return query.toString()
}

export default async function BrowseJobsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const jobs: Job[] = await getJobs(toQueryString(params))
  const pageCount = Math.ceil(jobs.length / PAGE_SIZE)

  return (
    <div className="bg-[#08080A]">
        <SiteNavbar></SiteNavbar>
      <main className="mx-auto max-w-6xl space-y-6 bg-[#08080A] p-4 sm:p-6">
        <JobSearchBar
          initialSearch={typeof params.search === "string" ? params.search : ""}
        />

        <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
          <JobFilters jobs={jobs} />

          <section className="min-w-0 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-lg font-semibold text-foreground">
                Found {jobs.length} Professional Jobs
              </h1>
              <JobSortSelect />
            </div>

            {jobs.length === 0 ? (
              <p className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
                No jobs match your search yet. Try different keywords or clear
                the filters.
              </p>
            ) : (
              jobs.map((job) => <JobCard key={job._id} job={job} />)
            )}

            <Pagination pageCount={pageCount} />
          </section>
        </div>
      </main>
    </div>
  )
}
