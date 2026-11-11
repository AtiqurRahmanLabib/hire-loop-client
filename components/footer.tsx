import Image from "next/image"
import Link from "next/link"

import logo from "@/app/assets/logo.png"

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.5v7h3Z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 4.5c2.4 0 2.7 0 3.7.1.9 0 1.4.2 1.7.3.4.2.7.4 1 .7.3.3.5.6.7 1 .1.3.3.8.3 1.7.1 1 .1 1.3.1 3.7s0 2.7-.1 3.7c0 .9-.2 1.4-.3 1.7-.2.4-.4.7-.7 1-.3.3-.6.5-1 .7-.3.1-.8.3-1.7.3-1 .1-1.3.1-3.7.1s-2.7 0-3.7-.1c-.9 0-1.4-.2-1.7-.3-.4-.2-.7-.4-1-.7-.3-.3-.5-.6-.7-1-.1-.3-.3-.8-.3-1.7-.1-1-.1-1.3-.1-3.7s0-2.7.1-3.7c0-.9.2-1.4.3-1.7.2-.4.4-.7.7-1 .3-.3.6-.5 1-.7.3-.1.8-.3 1.7-.3 1-.1 1.3-.1 3.7-.1ZM12 3c-2.4 0-2.8 0-3.7.1-1 0-1.6.2-2.2.4-.6.2-1.1.6-1.6 1.1-.5.5-.8 1-1.1 1.6-.2.6-.4 1.2-.4 2.2C3 9.2 3 9.6 3 12s0 2.8.1 3.7c0 1 .2 1.6.4 2.2.2.6.6 1.1 1.1 1.6.5.5 1 .8 1.6 1.1.6.2 1.2.4 2.2.4.9.1 1.3.1 3.7.1s2.8 0 3.7-.1c1 0 1.6-.2 2.2-.4.6-.2 1.1-.6 1.6-1.1.5-.5.8-1 1.1-1.6.2-.6.4-1.2.4-2.2.1-.9.1-1.3.1-3.7s0-2.8-.1-3.7c0-1-.2-1.6-.4-2.2-.2-.6-.6-1.1-1.1-1.6-.5-.5-1-.8-1.6-1.1-.6-.2-1.2-.4-2.2-.4C14.8 3 14.4 3 12 3Zm0 4.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.9-7.8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6.9 8.6H4V20h2.9V8.6ZM5.4 7.3a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4ZM10 20h2.9v-5.7c0-.3 0-.6.1-.8.2-.6.8-1.2 1.7-1.2 1.2 0 1.7.9 1.7 2.2V20h2.9v-5.9c0-2.8-1.5-4.1-3.5-4.1-1.6 0-2.3.9-2.7 1.5h-.1V8.6H10V20Z" />
    </svg>
  )
}

const columns: Array<{ title: string; links: string[] }> = [
  {
    title: "Product",
    links: ["Job discovery", "Worker AI", "Companies", "Salary data"],
  },
  {
    title: "Navigations",
    links: ["Help center", "Career library", "Contact"],
  },
  {
    title: "Resources",
    links: ["Brand Guideline", "Newsroom"],
  },
]

const socials = [
  { label: "Facebook", icon: FacebookIcon, href: "#" },
  { label: "Instagram", icon: InstagramIcon, href: "#" },
  { label: "LinkedIn", icon: LinkedinIcon, href: "#" },
]

export function Footer() {
  return (
    <footer className=" border-white/5 bg-[#010103] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 pt-14 pb-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" aria-label="hireloop home" className="inline-block">
              <Image
                src={logo}
                alt="hireloop"
                width={154}
                height={44}
                className="h-8 w-auto sm:h-9"
              />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-neutral-400">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="inline-flex size-9 items-center justify-center rounded-lg bg-[#6d5bf5] text-white transition-colors hover:bg-[#5c4ae3]"
                >
                  <social.icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="text-sm font-semibold text-[#8b7cf8]">
                  {column.title}
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {column.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-sm text-neutral-400 transition-colors hover:text-white"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 flex flex-col items-center justify-end gap-2 text-xs text-neutral-500 sm:flex-row sm:gap-8">
          <span>Copyright 2024 – Programming Hero</span>
          <span>
            <Link href="#" className="transition-colors hover:text-neutral-300">
              Terms &amp; Policy
            </Link>{" "}
            –{" "}
            <Link href="#" className="transition-colors hover:text-neutral-300">
              Privacy Guideline
            </Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
