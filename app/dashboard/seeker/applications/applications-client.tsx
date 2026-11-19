"use client"

import {
  BellIcon,
  BotIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  DownloadIcon,
  MailIcon,
  PenLineIcon,
  SearchIcon,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ApplicationStatusBadge } from "@/components/applications/application-status-badge"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import type { Application } from "@/types/application"

// icon-এর নাম (string) থেকে আসল component বের করার map
const ICON_MAP = {
  CodeIcon,
  PenLineIcon,
  DatabaseIcon,
  CloudIcon,
  BotIcon,
}

const ICON_DARK = "bg-zinc-800 text-zinc-300 border border-zinc-700/60"
const ICON_RED = "bg-red-800 text-red-100"

const PAGE_SIZE = 5
const MAX_VISIBLE_PAGES = 3

const ApplicationsClient = ({
  applications,
}: {
  applications: Application[]
}) => {
  const [tab, setTab] = useState<"active" | "archived">("active")
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)

  const filtered = applications.filter((app) => {
    const matchesTab = tab === "active" ? !app.archived : app.archived
    const matchesQuery =
      query.trim() === "" ||
      `${app.jobTitle} ${app.company}`
        .toLowerCase()
        .includes(query.toLowerCase())
    return matchesTab && matchesQuery
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  // সর্বোচ্চ ৩টা page নম্বর দেখাবে (1 2 3)
  const firstVisible = Math.max(
    1,
    Math.min(currentPage - 1, totalPages - MAX_VISIBLE_PAGES + 1)
  )
  const lastVisible = Math.min(totalPages, firstVisible + MAX_VISIBLE_PAGES - 1)
  const visiblePages = Array.from(
    { length: lastVisible - firstVisible + 1 },
    (_, i) => firstVisible + i
  )

  // Stats এখন আসল data থেকে হিসাব হচ্ছে
  const total = applications.length
  const shortlisted = applications.filter(
    (a) => a.status === "Shortlisted"
  ).length
  const offered = applications.filter((a) => a.status === "Offered").length
  const successRate = total > 0 ? Math.round((offered / total) * 100) : 0

  const stats = [
    {
      label: "Total Applied",
      value: String(total),
      valueClass: "text-foreground",
    },
    {
      label: "Shortlisted",
      value: String(shortlisted),
      valueClass: "text-foreground",
    },
    { label: "Offered", value: String(offered), valueClass: "text-amber-500" },
    {
      label: "Success Rate",
      value: `${successRate}%`,
      valueClass: "text-emerald-500",
    },
  ]

  const tabClass = (active: boolean) =>
    cn(
      "rounded-md border px-3 py-1.5 text-sm transition-colors",
      active
        ? "border-zinc-700 bg-zinc-800 text-foreground"
        : "border-transparent text-zinc-400 hover:text-zinc-200"
    )

  return (
    <div className="min-h-[calc(100svh-1rem)] overflow-hidden rounded-xl border border-zinc-800/80 bg-[#0E0E11] text-zinc-100">
      {/* Top bar */}
      <div className="flex items-center gap-3 border-b border-zinc-800/80 px-6 py-4">
        <SidebarTrigger className="-ml-2 text-zinc-400 hover:text-zinc-100" />
        <div className="relative w-full max-w-xs">
          <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(1)
            }}
            placeholder="Search applications..."
            className="border-zinc-800 bg-zinc-900/60 pl-9 text-sm placeholder:text-zinc-500"
          />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications"
            className="text-zinc-400"
          >
            <BellIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Messages"
            className="text-zinc-400"
          >
            <MailIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Profile"
            className="rounded-full"
          >
            {/* TODO: wire to session avatar */}
            <span className="size-8 overflow-hidden rounded-full bg-linear-to-br from-amber-500 to-rose-500" />
          </Button>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">My Applications</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Track your job applications and interview progress in real-time.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-zinc-800 bg-zinc-900/60 p-1">
              <button
                type="button"
                onClick={() => {
                  setTab("active")
                  setPage(1)
                }}
                className={tabClass(tab === "active")}
              >
                Active
              </button>
              <button
                type="button"
                onClick={() => {
                  setTab("archived")
                  setPage(1)
                }}
                className={tabClass(tab === "archived")}
              >
                Archived
              </button>
            </div>
            <Button
              className="bg-white text-zinc-900 hover:bg-zinc-200"
              // TODO: implement PDF export
            >
              <DownloadIcon />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 px-5 py-4"
            >
              <p className="text-sm text-zinc-400">{stat.label}</p>
              <p className={cn("mt-1 text-2xl font-semibold", stat.valueClass)}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/40">
          <div className="overflow-x-auto">
            <table className="w-full min-w-180 text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-800/80 bg-zinc-900/60 text-xs text-zinc-500">
                  <th className="px-5 py-3 font-medium">Job Title</th>
                  <th className="px-5 py-3 font-medium">Company</th>
                  <th className="px-5 py-3 font-medium">Applied</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((app) => {
                  const Icon = ICON_MAP[app.icon] ?? CodeIcon
                  const iconClass =
                    app.status === "Rejected" ? ICON_RED : ICON_DARK
                  return (
                    <tr
                      key={app.id}
                      className="border-b border-zinc-800/50 last:border-0"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "flex size-9 items-center justify-center rounded-lg",
                              iconClass
                            )}
                          >
                            <Icon className="size-4" />
                          </span>
                          <div>
                            <p className="font-medium">{app.jobTitle}</p>
                            <p className="text-xs text-zinc-500">
                              {app.jobType} • {app.location}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-zinc-300">
                        {app.company}
                      </td>
                      <td className="px-5 py-3.5 text-zinc-500">
                        {app.appliedAt}
                      </td>
                      <td className="px-5 py-3.5">
                        <ApplicationStatusBadge status={app.status} />
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-zinc-300"
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  )
                })}
                {paginated.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-12 text-center text-zinc-500"
                    >
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-zinc-800/80 bg-zinc-900/60 px-5 py-3">
            <p className="text-sm text-zinc-500">
              Showing{" "}
              {paginated.length > 0
                ? `${(currentPage - 1) * PAGE_SIZE + 1}-${(currentPage - 1) * PAGE_SIZE + paginated.length}`
                : 0}{" "}
              of {filtered.length} applications
            </p>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Previous page"
                disabled={currentPage === 1}
                className="border-zinc-800 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                onClick={() => setPage(currentPage - 1)}
              >
                <ChevronLeftIcon />
              </Button>
              {visiblePages.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={cn(
                    "size-8 rounded-lg text-sm transition-colors",
                    p === currentPage
                      ? "bg-white font-medium text-zinc-900"
                      : "text-zinc-400 hover:bg-zinc-800/60"
                  )}
                >
                  {p}
                </button>
              ))}
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Next page"
                disabled={currentPage === totalPages}
                className="border-zinc-800 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                onClick={() => setPage(currentPage + 1)}
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationsClient
