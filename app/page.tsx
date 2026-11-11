import Image from "next/image"

import globe from "@/app/assets/globe.png"
import { Hero } from "@/components/hero"
import { SiteNavbar } from "@/components/navbar"
import { WorldStats } from "@/components/world-stats"
import FeaturesJob from "@/components/FeaturesJob"
import { Cta } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="min-h-svh overflow-x-clip bg-[#07070b] text-white">
      <SiteNavbar />
      <main className="relative">
        {/* Hero backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-170 max-w-[1890px] sm:h-220 lg:h-355"
        >
          <Image
            src={globe}
            alt=""
            fill
            priority
            className="object-cover object-[center_45%]"
          />

          {/* purple corner glow ke pura dhaka: uporer 55% solid kalo theke fade */}
          <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-[#07070b] via-[#07070b]/95 to-transparent" />

          {/* dui pashe-o ektu kalo kore dewa */}
          <div className="absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-[#07070b] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-[#07070b] to-transparent" />

          {/* niche section ar sathe mishe jawar jonno */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#07070b]" />
        </div>

        <Hero />
        <WorldStats />
        <FeaturesJob />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}