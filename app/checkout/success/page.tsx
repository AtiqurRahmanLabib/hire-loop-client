import Link from "next/link"
import { ArrowRightIcon, CheckIcon, ShieldCheckIcon } from "lucide-react"

import { checkoutVerify } from "@/lib/actions/payments"
import { stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"

interface CheckoutSuccessPageProps {
  searchParams: Promise<{
    session_id?: string
  }>
}

export default async function CheckOutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)")

  const {
    status,
    payment_intent,
    payment_status,
    customer_email,
    metadata,
    amount_total,
    currency,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  })
  console.log(status, payment_status, payment_intent, customer_email, metadata)

  if (status === "open") {
    return redirect("/")
  }

  if (status === "complete" && payment_status === "paid") {
    const result = await checkoutVerify(session_id)
    console.log(
      status,
      payment_status,
      payment_intent,
      customer_email,
      metadata
    )
    console.log("Stripe User ID:", metadata?.userId)
    console.log({ result })

    const amount =
      amount_total != null
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: (currency ?? "usd").toUpperCase(),
          }).format(amount_total / 100)
        : "$20.00"

    const sessionLabel =
      session_id.length > 24 ? `${session_id.slice(0, 24)}...` : session_id

    return (
      <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 py-12 text-[#f4f4f5]">
        {/* Blue glow behind the card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 h-64 w-[540px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#1d4ed8]/20 blur-[90px]"
        />

        <section
          id="success"
          className="relative w-full max-w-[356px] rounded-xl border border-white/[0.06] bg-[#111113] px-8 py-8 text-center shadow-[0_24px_70px_-24px_rgba(0,0,0,0.9)]"
        >
          <div className="flex justify-center">
            <div className="flex size-15 items-center justify-center rounded-full bg-[#0d2b1d] shadow-[0_0_40px_-6px_rgba(34,197,94,0.5)] ring-1 ring-[#22c55e]/25">
              <CheckIcon className="size-7 text-[#22c55e]" strokeWidth={2.5} />
            </div>
          </div>

          <span className="mt-4 inline-flex items-center rounded-full border border-[#1c4a33] bg-[#0f2419] px-2.5 py-1 text-[9px] font-semibold tracking-[0.14em] text-[#4ade80] uppercase">
            Upgrade Successful
          </span>

          <h1 className="mt-3 text-[22px] font-semibold tracking-tight text-white">
            Welcome to Hireloop Pro
          </h1>

          <p className="mt-4 text-sm text-[#8f8f96]">
            Your payment of{" "}
            <span className="font-semibold text-white">{amount}</span> was
            received perfectly.
          </p>

          <p className="mt-3 text-[13px] leading-relaxed text-[#8f8f96]">
            All advanced premium recruiting modules are unlocked on your
            account. You may need to{" "}
            <Link
              href="/sign-in"
              className="font-medium text-[#4ade80] transition-colors hover:text-[#6ee7a0] hover:underline"
            >
              re-authenticate
            </Link>{" "}
            to see the effect.
          </p>

          <div className="mt-6 flex items-center justify-between gap-3 rounded-lg border border-[#232327] bg-[#0d0d0f] px-3 py-2.5">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <ShieldCheckIcon className="size-4 text-[#71717a]" />

              <span className="text-xs text-[#8f8f96]">
                Session ID Verified
              </span>
            </div>

            <span
              title={session_id}
              className="max-w-[140px] truncate rounded border border-[#26262b] bg-[#161619] px-1.5 py-0.5 font-mono text-[10px] text-[#8f8f96]"
            >
              {sessionLabel}
            </span>
          </div>

          <Link
            href="/dashboard/recruiter"
            className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-white text-sm font-semibold text-[#0a0a0a] transition-colors hover:bg-[#e8e8ea] focus-visible:ring-2 focus-visible:ring-[#4ade80]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113] focus-visible:outline-none"
          >
            Go to Workspace Dashboard
            <ArrowRightIcon className="size-4" />
          </Link>
        </section>
      </div>
    )
  }
}
