import Image from "next/image"

import globe from "@/app/assets/globe.png"
import { Hero } from "@/components/hero"
import { SiteNavbar } from "@/components/navbar"
import { WorldStats } from "@/components/world-stats"

export default function Page() {
  return (
    <div className="min-h-svh overflow-x-clip bg-[#0a0a0e] text-white">
      <SiteNavbar />
      <main className="relative">
        {/* Full hero backdrop: starfield, purple corner glows, globe horizon */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[680px] max-w-[1890px] sm:h-[880px] lg:h-[1420px]"
        >
          <Image
            src={globe}
            alt=""
            fill
            priority
            className="object-cover object-[center_20%]"
          />
          {/* tone down the asset's very bright magenta at the top to match the Figma */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#0a0a0e]/80 via-[#0a0a0e]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#0a0a0e]" />
        </div>

        <Hero />
        <WorldStats />
      </main>
    </div>
  )
}
