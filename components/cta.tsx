import Image from "next/image"
import Link from "next/link"

import ctaBg from "@/app/assets/cta-bg.png"

export function Cta() {
  return (
    <section className="relative overflow-hidden bg-[#010103]">
      {/* 1) Purple glow layer (Figma ar dome glow) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
      >
        <div className="h-[520px] w-[92%] max-w-[1200px] rounded-t-[100%] bg-gradient-to-b from-indigo-500/70 via-indigo-600/15 to-transparent blur-2xl" />
      </div>

      {/* 2) Wireframe grid image, edge soft kora */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center mt-5"
      >
        <Image
          src={ctaBg}
          alt=""
          width={1440}
          height={964}
          priority={false}
          className="w-full max-w-[1440px] [mask-image:radial-gradient(ellipse_at_top,black_50%,transparent_78%)]"
        />
      </div>

      {/* 3) Content: padding kome gese jate heading dome ar upore thake */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 pt-28 pb-32 text-center sm:pt-36 lg:pt-44">
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Your next role is
          <br />
          already looking for you
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-neutral-300">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/sign-up"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-6 text-sm font-medium text-[#0a0a0e] transition-colors hover:bg-neutral-200"
          >
            Create a free account
          </Link>
          <Link
            href="#"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-white/[0.06] px-6 text-sm font-medium text-white ring-1 ring-white/10 transition-colors hover:bg-white/10"
          >
            View pricing
          </Link>
        </div>
      </div>
    </section>
  )
}