"use client"

import { useMemo, useState } from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  UsersIcon,
} from "lucide-react"
import {
  ApplicationStatusFilter,
  type ApplicationStatusFilterValue,
} from "@/components/applications/application-status-filter"
import { ApplicationStatusSelect } from "@/components/applications/application-status-select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import type { ApplicationStatus, JobApplicant } from "@/types/application"
import { updateApplications } from "@/lib/actions/application"

const PAGE_SIZE = 10

const thClass =
  "px-4 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase whitespace-nowrap"
const tdClass = "px-4 py-4 align-middle"

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2)
  return parts.map((part) => part.charAt(0).toUpperCase()).join("") || "A"
}

type ApplicationsTableProps = {
  applicants: JobApplicant[]
}

export default function ApplicationsTable({
  applicants,
}: ApplicationsTableProps) {
  // Status edits are optimistic/local until the API supports persistence.
  const [statusOverrides, setStatusOverrides] = useState<
    Record<string, ApplicationStatus>
  >({})
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] =
    useState<ApplicationStatusFilterValue>("all")
  const [page, setPage] = useState(1)

  const rows = useMemo(
    () =>
      applicants.map((applicant) => ({
        ...applicant,
        status: statusOverrides[applicant.id] ?? applicant.status,
      })),
    [applicants, statusOverrides]
  )

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase()

    return rows.filter((row) => {
      const matchesStatus =
        statusFilter === "all" || row.status === statusFilter
      const matchesSearch =
        !query || `${row.name} ${row.email}`.toLowerCase().includes(query)

      return matchesStatus && matchesSearch
    })
  }, [rows, search, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const visibleRows = filteredRows.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const stats = [
    {
      label: "Total applicants",
      value: rows.length,
      valueClass: "text-foreground",
    },
    {
      label: "In review",
      value: rows.filter((row) => row.status === "Review").length,
      valueClass: "text-amber-500",
    },
    {
      label: "Shortlisted",
      value: rows.filter((row) => row.status === "Shortlisted").length,
      valueClass: "text-blue-400",
    },
    {
      label: "Offered",
      value: rows.filter((row) => row.status === "Offered").length,
      valueClass: "text-emerald-500",
    },
  ]

  async function handleStatusChange(id: string, status: ApplicationStatus) {
    setStatusOverrides((previous) => ({ ...previous, [id]: status }))
    const result = await updateApplications(id, { status })
    console.log(result)
    toast.add({
      type: "success",
      title: `Status changed to ${status}`,
      description: "This change isn't saved to the database yet.",
    })
  }

  function clearFilters() {
    setSearch("")
    setStatusFilter("all")
    setPage(1)
  }

  const firstVisible =
    filteredRows.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const lastVisible = Math.min(currentPage * PAGE_SIZE, filteredRows.length)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card px-5 py-4"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className={cn("mt-1 text-2xl font-semibold", stat.valueClass)}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
              setPage(1)
            }}
            placeholder="Search by name or email..."
            aria-label="Search applicants"
            className="h-9 pl-9"
          />
        </div>

        <ApplicationStatusFilter
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value)
            setPage(1)
          }}
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-160 text-left text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th scope="col" className={thClass}>
                  Applicant
                </th>
                <th scope="col" className={thClass}>
                  Email
                </th>
                <th scope="col" className={thClass}>
                  Applied on
                </th>
                <th scope="col" className={cn(thClass, "text-right")}>
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border/60">
              {visibleRows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-14 text-center">
                    <UsersIcon className="mx-auto size-8 text-muted-foreground/60" />
                    <p className="mt-3 text-sm font-medium text-foreground">
                      {rows.length === 0
                        ? "No applications yet"
                        : "No applicants match your filters"}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {rows.length === 0
                        ? "Applications will appear here once candidates apply to this job."
                        : "Try a different search term or status."}
                    </p>
                    {rows.length > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={clearFilters}
                      >
                        Clear filters
                      </Button>
                    )}
                  </td>
                </tr>
              ) : (
                visibleRows.map((row) => (
                  <tr
                    key={row.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className={tdClass}>
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#6d5bf5]/15 text-xs font-semibold text-[#6d5bf5]"
                        >
                          {initials(row.name)}
                        </span>
                        <span className="font-medium text-foreground">
                          {row.name}
                        </span>
                      </div>
                    </td>

                    <td className={cn(tdClass, "text-muted-foreground")}>
                      {row.email || "—"}
                    </td>

                    <td
                      className={cn(
                        tdClass,
                        "whitespace-nowrap text-muted-foreground"
                      )}
                    >
                      {row.appliedAtLabel}
                    </td>

                    <td className={cn(tdClass, "text-right")}>
                      <div className="flex justify-end">
                        <ApplicationStatusSelect
                          value={row.status}
                          onValueChange={(status) =>
                            handleStatusChange(row.id, status)
                          }
                          aria-label={`Update status for ${row.name}`}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredRows.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-muted/20 px-4 py-3">
            <p className="text-sm text-muted-foreground">
              Showing {firstVisible}-{lastVisible} of {filteredRows.length}
            </p>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => setPage((previous) => Math.max(1, previous - 1))}
              >
                <ChevronLeftIcon className="size-4" />
              </Button>

              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>

              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                aria-label="Next page"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setPage((previous) => Math.min(totalPages, previous + 1))
                }
              >
                <ChevronRightIcon className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
