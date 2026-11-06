import Link from "next/link"
import type { Metadata } from "next"

import { AuthShell } from "@/components/auth-shell"
import { SignUpForm } from "@/components/sign-up-form"

export const metadata: Metadata = { title: "Sign up — hireloop" }

export default function SignUpPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Start your journey with HireLoop and land your dream role — faster."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-[#8b7cf8] transition-colors hover:text-[#a99bfa]"
          >
            Sign in
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthShell>
  )
}
