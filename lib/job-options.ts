import {
  BoxesIcon,
  BriefcaseIcon,
  CodeIcon,
  MegaphoneIcon,
  PenToolIcon,
  type LucideIcon,
} from "lucide-react"

// Shared job field options — used by the add-jobs form and the browse filters

export const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"]

export const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Marketing",
  "Product & Project",
]

export const FREQUENCIES = ["per hour", "per day", "per month", "per year"]

/** Icon + accent color per job category. */
export const CATEGORY_STYLES: Record<
  string,
  { icon: LucideIcon; color: string }
> = {
  "Engineering & Tech": { icon: CodeIcon, color: "text-indigo-300" },
  "Design & Creative": { icon: PenToolIcon, color: "text-orange-400" },
  Marketing: { icon: MegaphoneIcon, color: "text-rose-300" },
  "Product & Project": { icon: BoxesIcon, color: "text-teal-300" },
}

export const DEFAULT_CATEGORY_STYLE = {
  icon: BriefcaseIcon,
  color: "text-muted-foreground",
}
