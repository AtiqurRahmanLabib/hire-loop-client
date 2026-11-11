import { HomeIcon, SearchXIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-[#6d5bf5]/15">
        <SearchXIcon className="size-9 text-[#6d5bf5]" />
      </div>

      <p className="text-sm font-medium tracking-widest text-[#6d5bf5]">
        ERROR 404
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-foreground sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        The page you are looking for doesn&apos;t exist, was moved, or the job
        listing may have been removed.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          nativeButton={false}
          render={<Link href="/" />}
          className="h-10 gap-2 rounded-lg bg-[#6d5bf5] px-5 text-white hover:bg-[#5c4ae3]"
        >
          <HomeIcon className="size-4" />
          Back to Home
        </Button>
      </div>
    </div>
  )
}
