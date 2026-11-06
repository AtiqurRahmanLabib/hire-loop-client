import Link from "next/link"
import type { Metadata } from "next"

import { AuthShell } from "@/components/auth-shell"
import { SignInForm } from "@/components/sign-in-form"

export const metadata: Metadata = { title: "Sign in — hireloop" }

export default function SignInPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your HireLoop account to continue."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-[#8b7cf8] transition-colors hover:text-[#a99bfa]"
          >
            Sign up
          </Link>
        </>
      }
    >
      <SignInForm />
    </AuthShell>
  )
}
