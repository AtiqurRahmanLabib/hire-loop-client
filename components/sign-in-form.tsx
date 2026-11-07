"use client"

import { Button } from "@/components/ui/button"
import { authInputClass } from "@/components/auth-shell"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type SignInData = { email: string; password: string }

export function SignInForm() {
  const router = useRouter()
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as unknown as SignInData
    const { data: singInData, error } = await authClient.signIn.email({
      email: data.email, // required, The email address of the user.
      password: data.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
      rememberMe: true, // If false, the user will be signed out when the browser is closed. (optional) (default: true)

    })
    if (singInData) {
      toast.success("Wellcome back!")
      router.push('/')
      console.log(singInData)
    }
    if (error) {
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm text-neutral-300">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={authInputClass}
        />
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm text-neutral-300">
            Password
          </label>
          <a
            href="#"
            className="text-xs text-[#8b7cf8] transition-colors hover:text-[#a99bfa]"
          >
            Forgot password?
          </a>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className={authInputClass}
        />
      </div>
      <Button
        type="submit"
        className="mt-2 h-10 w-full rounded-lg bg-[#6d5bf5] text-white hover:bg-[#5c4ae3]"
      >
        Sign In
      </Button>
    </form>
  )
}
