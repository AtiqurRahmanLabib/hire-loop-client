"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import logo from "@/app/assets/logo.png"

const navLinks = [
  { label: "Browse Jobs", href: "#" },
  { label: "Company", href: "#" },
  { label: "Pricing", href: "#" },
]

function SignInLink({ className }: { className?: string }) {
  return (
    <Link
      href="/sign-in"
      className={cn(
        "text-sm font-medium text-[#8b7cf8] transition-colors hover:text-[#a99bfa]",
        className
      )}
    >
      Sign In
    </Link>
  )
}

function GetStartedButton({ className }: { className?: string }) {
  return (
    <Button
      render={<Link href="/sign-up" />}
      className={cn(
        "h-10 rounded-lg bg-[#6d5bf5] px-6 text-white hover:bg-[#5c4ae3]",
        className
      )}
    >
      Get Started
    </Button>
  )
}

export function SiteNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0b0b0f] text-white">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="hireloop home" className="shrink-0">
          <Image
            src={logo}
            alt="hireloop"
            width={154}
            height={44}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-sm text-neutral-200 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <span
            aria-hidden="true"
            className="mx-3 h-5 w-px shrink-0 bg-white/15"
          />
          <SignInLink className="px-3 py-1.5" />
          <GetStartedButton className="ml-5" />
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex size-10 items-center justify-center rounded-lg text-neutral-200 transition-colors hover:bg-white/10 md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          aria-label="Main mobile"
          className="border-t border-white/10 bg-[#0b0b0f] px-4 pt-2 pb-4 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm text-neutral-200 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <span
            aria-hidden="true"
            className="my-2 block h-px w-full bg-white/10"
          />
          <div className="flex items-center justify-between px-3 pt-2">
            <SignInLink />
            <GetStartedButton />
          </div>
        </nav>
      )}
    </header>
  )
}
