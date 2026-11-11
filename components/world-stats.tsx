import {
  Briefcase,
  Building2,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react"

const stats: Array<{ icon: LucideIcon; value: string; label: string }> = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Users, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
]

export function WorldStats() {
  return (
    <section className="relative z-10 pb-16">
      <div className="mx-auto max-w-5xl px-4">
        <p className="mx-auto max-w-2xl pt-56 text-center text-2xl leading-snug font-medium text-neutral-300 sm:pt-72 sm:text-3xl lg:pt-80 lg:text-4xl">
          Assisting over{" "}
          <span className="text-[1.3em] font-semibold text-white">15,000</span>{" "}
          job seekers find their dream positions.
        </p>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:mt-20 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c0c10]/95 p-5 backdrop-blur-md sm:h-56 lg:h-64"
            >
              <span className="text-neutral-300">
                <stat.icon className="size-4" />
              </span>
              <div>
                <p className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-neutral-300">{stat.label}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
