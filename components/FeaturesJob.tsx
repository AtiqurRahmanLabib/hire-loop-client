// components/features-job.tsx
import {
  Search,
  LineChart,
  BarChart3,
  Bookmark,
  MousePointerClick,
  FileUser,
  Hexagon,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const features: Feature[] = [
  {
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
    icon: Search,
  },
  {
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
    icon: LineChart,
  },
  {
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
    icon: BarChart3,
  },
  {
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
    icon: Bookmark,
  },
  {
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
    icon: MousePointerClick,
  },
  {
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
    icon: FileUser,
  },
  {
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
    icon: Hexagon,
  },
  {
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
    icon: TrendingUp,
  },
];

export default function FeaturesJob() {
  return (
    <section className="bg-[#1c1c1c] px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Eyebrow + heading */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3 font-mono text-sm uppercase tracking-wider text-neutral-300">
            <span className="size-1.5 bg-indigo-500" />
            Features Job
            <span className="size-1.5 bg-indigo-500" />
          </div>

          <h2 className="mt-6 max-w-md text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Everything you need to succeed
          </h2>
        </div>

        {/* Features grid */}
        <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 justify-center">
          {features.map(({ title, description, icon: Icon }) => (
            <Card
              key={title}
              className="bg-transparent ring-0 p-0 shadow-none"
            >
              <CardContent className="flex items-start gap-4 p-0">
                {/* Icon tile */}
                <div className="flex size-19 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-linear-to-b from-neutral-800/60 to-black shadow-inner">
                  <Icon className="size-5 text-fuchsia-300" strokeWidth={1.5} />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-[15px] font-medium text-white">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                    {description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}