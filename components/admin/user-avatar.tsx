import { cn } from "@/lib/utils"

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2)

  return parts.map((part) => part.charAt(0).toUpperCase()).join("") || "U"
}

type UserAvatarProps = {
  name: string
  image?: string | null
  className?: string
}

export function UserAvatar({ name, image, className }: UserAvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#6d5bf5]/15 text-xs font-semibold text-[#6d5bf5]",
        className
      )}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element -- avatars can come from any OAuth provider.
        <img
          src={image}
          alt=""
          referrerPolicy="no-referrer"
          className="size-full object-cover"
        />
      ) : (
        getInitials(name)
      )}
    </span>
  )
}
