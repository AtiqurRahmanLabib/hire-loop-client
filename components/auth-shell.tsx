import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"

import logo from "@/app/assets/logo.png"

/** Shared input styling for both auth forms. */
export const authInputClass =
  "h-10 w-full rounded-lg border border-white/10 bg-white/[0.05] px-3 text-sm text-white outline-none placeholder:text-neutral-500 focus-visible:border-[#6d5bf5]/60 focus-visible:ring-3 focus-visible:ring-[#6d5bf5]/30"

type AuthShellProps = {
  title: string
  subtitle: string
  footer: ReactNode
  children: ReactNode
}

export function AuthShell({
  title,
  subtitle,
  footer,
  children,
}: AuthShellProps) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-[#0a0a0e] px-4 py-16 text-white">
      {/* subtle purple ambient glow, matching the site */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(109,91,245,0.12),transparent_70%)]"
      />
      <Link
        href="/"
        aria-label="hireloop home"
        className="relative mb-8 shrink-0"
      >
        <Image
          src={logo}
          alt="hireloop"
          width={154}
          height={44}
          priority
          className="h-9 w-auto"
        />
      </Link>
      <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <h1 className="text-xl font-semibold sm:text-2xl">{title}</h1>
        <p className="mt-1.5 text-sm text-neutral-400">{subtitle}</p>
        {children}
      </div>
      <div className="relative mt-6 text-sm text-neutral-400">{footer}</div>
    </div>
  )
}
