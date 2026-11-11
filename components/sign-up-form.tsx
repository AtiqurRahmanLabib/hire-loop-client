"use client"

import { Button } from "@/components/ui/button"
import { authInputClass } from "@/components/auth-shell"
import { authClient } from "@/lib/auth-client"
import { USER_ROLES, type UserRole } from "@/lib/roles"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "@/components/ui/toast"

type SignUpData = { name: string; email: string; password: string }

const roleDescriptions: Record<UserRole, string> = {
  seeker: "I'm looking for a job",
  recruiter: "I'm hiring",
  admin: "Platform administrator",
}

export function SignUpForm() {
  const router = useRouter()
  const [role, setRole] = useState<UserRole>("seeker")
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as unknown as SignUpData
    const { data: signUpData, error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      role,
      callbackURL: "/",
    })
    if (signUpData) {
      console.log("sign up form data:", signUpData)
      router.push("/")
      toast.add({ type: "success", title: "User Created Succsessfully!" })
    }
    if (error) {
      console.log("sign up form error:", error)
      toast.add({
        type: "error",
        title: "Sign up failed",
        description: error.message ?? "Something went wrong. Please try again.",
      })
    }
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
      <div className="space-y-1.5">
        <label className="text-sm text-neutral-300">I am a</label>
        <div className="grid grid-cols-3 gap-2">
          {USER_ROLES.map((option) => (
            <label
              key={option}
              className="cursor-pointer rounded-lg border border-neutral-700 bg-neutral-900/50 px-2 py-2.5 text-center transition-colors hover:border-neutral-500 has-checked:border-[#6d5bf5] has-checked:bg-[#6d5bf5]/15"
            >
              <input
                type="radio"
                name="role"
                value={option}
                checked={role === option}
                onChange={() => setRole(option)}
                className="sr-only"
              />
              <span className="block text-sm font-medium text-white">
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </span>
              <span className="mt-0.5 block text-[11px] leading-tight text-neutral-400">
                {roleDescriptions[option]}
              </span>
            </label>
          ))}
        </div>
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
