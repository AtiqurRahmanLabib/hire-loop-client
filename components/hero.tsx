import Link from "next/link"
import { Flame, MapPin, Search } from "lucide-react"

const trending = ["Product Designer", "AI Engineering", "Dev-ops Engineer"]

export function Hero() {
  return (
    <section className="relative z-10 mx-auto max-w-3xl px-4 pt-32 pb-16 text-center sm:pt-40 lg:pt-48">
      <div className="relative flex items-center justify-center gap-4">
        <span
          aria-hidden="true"
          className="hidden h-px w-16 bg-linear-to-r from-transparent to-white/25 sm:block"
        />
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 py-1.5 pr-4 pl-1.5">
          <span className="inline-flex size-6 items-center justify-center rounded-md bg-[#f97316]/15">
            <Flame className="size-3.5 text-[#f97316]" />
          </span>
          <span className="text-xs font-semibold text-[#f97316]">50,000+</span>
          <span className="text-xs tracking-[0.18em] text-neutral-500 uppercase">
            New Jobs This Month
          </span>
        </span>
        <span
          aria-hidden="true"
          className="hidden h-px w-16 bg-linear-to-l from-transparent to-white/25 sm:block"
        />
      </div>

      <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
        Find Your Dream Job Today
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-400">
        HireLoop connects top talent with world-class companies. Browse
        thousands of curated opportunities and land your next role — faster.
      </p>

      {/* search bar */}
      <form
        action="/"
        className="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-full border border-white/10 bg-[#14141a]/90 py-2 pr-2 pl-5"
      >
        <label className="flex min-w-0 flex-1 items-center gap-2">
          <Search className="size-4 shrink-0 text-neutral-500" />
          <input
            name="q"
            placeholder="Job title, skill or company"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
          />
        </label>
        <span
          aria-hidden="true"
          className="hidden h-5 w-px bg-white/10 sm:block"
        />
        <label className="hidden w-40 items-center gap-2 sm:flex">
          <MapPin className="size-4 shrink-0 text-neutral-500" />
          <input
            name="location"
            placeholder="Location or Remote"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
          />
        </label>
        <button
          type="submit"
          aria-label="Search jobs"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#6d5bf5] text-white transition-colors hover:bg-[#5c4ae3]"
        >
          <Search className="size-4" />
        </button>
      </form>

      {/* trending positions */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
        <span className="text-xs text-neutral-500">Trending Position:</span>
        {trending.map((t) => (
          <Link
            key={t}
            href="#"
            className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            {t}
          </Link>
        ))}
      </div>
    </section>
  )
}
