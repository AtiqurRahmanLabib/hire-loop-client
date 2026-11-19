"use client"

import { useMemo, useState } from "react"
import {
  BadgeCheckIcon,
  BriefcaseBusinessIcon,
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  MailCheckIcon,
  SearchIcon,
  ShieldCheckIcon,
  UserRoundSearchIcon,
  UserSearchIcon,
  UsersIcon,
} from "lucide-react"

import { StatCard, type StatCardProps } from "@/components/admin/stat-card"
import { UserAvatar } from "@/components/admin/user-avatar"
import {
  UserRoleFilter,
  type UserRoleFilterValue,
} from "@/components/admin/user-role-filter"
import { UserRoleSelect } from "@/components/admin/user-role-select"
import { UserStatusBadge } from "@/components/admin/user-status-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import { USER_ROLE_LABELS, type UserRole } from "@/lib/roles"
import { cn } from "@/lib/utils"
import type { AdminUserRow } from "./types"

const PAGE_SIZE = 10

const thClass =
  "px-4 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase whitespace-nowrap"
const tdClass = "px-4 py-4 align-middle"

function shareLabel(count: number, total: number) {
  if (total === 0) return "0%"

  return `${Math.round((count / total) * 100)}%`
}

function shortId(id: string) {
  return id.length > 8 ? `${id.slice(0, 8)}…` : id
}

type UsersViewProps = {
  users: AdminUserRow[]
}

export default function UsersView({ users }: UsersViewProps) {
  // Role changes are UI-only until the admin API is wired up.
  const [roleOverrides, setRoleOverrides] = useState<Record<string, UserRole>>(
    {}
  )
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState<UserRoleFilterValue>("all")
  const [page, setPage] = useState(1)

  const rows = useMemo(
    () =>
      users.map((user) => ({
        ...user,
        role: roleOverrides[user.id] ?? user.role,
      })),
    [users, roleOverrides]
  )

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase()

    return rows.filter((row) => {
      const matchesRole = roleFilter === "all" || row.role === roleFilter
      const matchesSearch =
        !query ||
        `${row.name} ${row.email} ${row.id}`.toLowerCase().includes(query)

      return matchesRole && matchesSearch
    })
  }, [rows, search, roleFilter])

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const visibleRows = filteredRows.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const totalUsers = rows.length
  const roleCounts = useMemo(
    () => ({
      admin: rows.filter((row) => row.role === "admin").length,
      recruiter: rows.filter((row) => row.role === "recruiter").length,
      seeker: rows.filter((row) => row.role === "seeker").length,
      verified: rows.filter((row) => row.emailVerified).length,
    }),
    [rows]
  )

  const stats: StatCardProps[] = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: UsersIcon,
      hint: "All accounts",
      iconClassName: "bg-[#6d5bf5]/15 text-[#6d5bf5]",
    },
    {
      label: "Admins",
      value: roleCounts.admin,
      icon: ShieldCheckIcon,
      hint: shareLabel(roleCounts.admin, totalUsers),
      iconClassName: "bg-[#6d5bf5]/15 text-[#6d5bf5]",
      hintClassName: "text-emerald-500",
    },
    {
      label: "Recruiters",
      value: roleCounts.recruiter,
      icon: BriefcaseBusinessIcon,
      hint: shareLabel(roleCounts.recruiter, totalUsers),
      iconClassName: "bg-sky-500/15 text-sky-500",
      hintClassName: "text-emerald-500",
    },
    {
      label: "Seekers",
      value: roleCounts.seeker,
      icon: UserSearchIcon,
      hint: shareLabel(roleCounts.seeker, totalUsers),
      iconClassName: "bg-emerald-500/15 text-emerald-500",
      hintClassName: "text-emerald-500",
    },
    {
      label: "Verified Emails",
      value: roleCounts.verified,
      icon: MailCheckIcon,
      hint: shareLabel(roleCounts.verified, totalUsers),
      iconClassName: "bg-amber-500/15 text-amber-500",
      hintClassName: "text-emerald-500",
    },
  ]

  function handleRoleChange(userId: string, role: UserRole) {
    setRoleOverrides((previous) => ({ ...previous, [userId]: role }))

    // TODO: Persist the new role through the admin API and revalidate this page.
    toast.add({
      type: "success",
      title: `Role changed to ${USER_ROLE_LABELS[role]}`,
      description: "This change isn't saved to the database yet.",
    })
  }

  function handleExport() {
    toast.add({
      type: "info",
      title: "Export isn't available yet",
      description: "Connect this handler to your reporting endpoint.",
    })
  }

  function clearFilters() {
    setSearch("")
    setRoleFilter("all")
    setPage(1)
  }

  const firstVisible =
    filteredRows.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const lastVisible = Math.min(currentPage * PAGE_SIZE, filteredRows.length)

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            User Management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage accounts and assign roles across the platform.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm text-muted-foreground">
            <CalendarDaysIcon className="size-4" />
            All time
          </span>

          <Button
            type="button"
            size="lg"
            onClick={handleExport}
            className="h-9 gap-2"
          >
            <DownloadIcon className="size-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            <h2 className="font-medium text-foreground">All Users</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {rows.length} {rows.length === 1 ? "account" : "accounts"} on the
              platform
            </p>
          </div>

          <span className="text-sm text-muted-foreground">
            {filteredRows.length} matching
          </span>
        </div>

        <div className="flex flex-col gap-3 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
                setPage(1)
              }}
              placeholder="Search by name, email, or ID..."
              aria-label="Search users"
              className="h-9 pl-9"
            />
          </div>

          <UserRoleFilter
            value={roleFilter}
            onValueChange={(value) => {
              setRoleFilter(value)
              setPage(1)
            }}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-200 text-left text-sm">
            <caption className="sr-only">
              Platform users and their current roles
            </caption>

            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th scope="col" className={thClass}>
                  User
                </th>
                <th scope="col" className={thClass}>
                  Role
                </th>
                <th scope="col" className={thClass}>
                  User ID
                </th>
                <th scope="col" className={thClass}>
                  Joined
                </th>
                <th scope="col" className={cn(thClass, "text-right")}>
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border/60">
              {visibleRows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-14 text-center">
                    <UserRoundSearchIcon className="mx-auto size-8 text-muted-foreground/60" />
                    <p className="mt-3 text-sm font-medium text-foreground">
                      {rows.length === 0
                        ? "No users yet"
                        : "No users match your filters"}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {rows.length === 0
                        ? "Accounts will appear here once people sign up."
                        : "Try a different search term or role."}
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
                visibleRows.map((user) => (
                  <tr
                    key={user.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className={tdClass}>
                      <div className="flex items-center gap-3">
                        <UserAvatar name={user.name} image={user.image} />

                        <div className="min-w-0">
                          <p className="truncate font-medium text-foreground">
                            {user.name}
                          </p>
                          <p className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
                            <span className="truncate">
                              {user.email || "No email"}
                            </span>
                            {user.emailVerified && (
                              <BadgeCheckIcon
                                aria-label="Email verified"
                                className="size-3.5 shrink-0 text-emerald-500"
                              />
                            )}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className={tdClass}>
                      <UserRoleSelect
                        value={user.role}
                        onValueChange={(role) =>
                          handleRoleChange(user.id, role)
                        }
                        aria-label={`Change role for ${user.name} (currently ${USER_ROLE_LABELS[user.role]})`}
                      />
                    </td>

                    <td
                      className={cn(
                        tdClass,
                        "font-mono text-xs whitespace-nowrap text-muted-foreground"
                      )}
                    >
                      <span title={user.id}>#{shortId(user.id)}</span>
                    </td>

                    <td
                      className={cn(
                        tdClass,
                        "whitespace-nowrap text-muted-foreground"
                      )}
                    >
                      {user.joinedAtLabel}
                    </td>

                    <td className={cn(tdClass, "text-right")}>
                      <div className="flex justify-end">
                        <UserStatusBadge banned={user.banned} />
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
