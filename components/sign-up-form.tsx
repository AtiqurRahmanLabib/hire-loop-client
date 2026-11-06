"use client"

import { Button } from "@/components/ui/button"
import { authInputClass } from "@/components/auth-shell"

type SignUpData = { name: string; email: string; password: string }

export function SignUpForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as unknown as SignUpData
    // TODO: integrate with better-auth — `authClient.signUp.email(data)`
    console.log("sign up form data:", data)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm text-neutral-300">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Ada Lovelace"
          className={authInputClass}
        />
      </div>
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
        <label htmlFor="password" className="text-sm text-neutral-300">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          placeholder="At least 8 characters"
          className={authInputClass}
        />
      </div>
      <Button
        type="submit"
        className="mt-2 h-10 w-full rounded-lg bg-[#6d5bf5] text-white hover:bg-[#5c4ae3]"
      >
        Create Account
      </Button>
    </form>
  )
}
