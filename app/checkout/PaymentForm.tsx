"use client"

import Link from "next/link"
import { useState } from "react"
import {
  ArrowLeftIcon,
  CheckIcon,
  CreditCardIcon,
  LockIcon,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// TODO: Replace with real values coming from the Stripe Checkout session / pricing config
const USD_PRICE = 20
const EXCHANGE_RATE = 127.6665

const CURRENCIES = [
  { code: "BDT", flag: "🇧🇩", label: "BDT" },
  { code: "USD", flag: "🇺🇸", label: "USD" },
] as const

const COUNTRIES = [
  "Bangladesh",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "India",
  "Japan",
]

type CurrencyCode = (typeof CURRENCIES)[number]["code"]

const formatAmount = (currency: CurrencyCode) => {
  const amount = currency === "BDT" ? USD_PRICE * EXCHANGE_RATE : USD_PRICE
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const fieldLabelClass =
  "text-[11px] font-semibold uppercase tracking-wider text-[#8f8f96]"

const inputClass =
  "h-10 w-full rounded-md border border-[#31313a] bg-[#26262e] px-3 text-sm text-[#f0f0f2] placeholder:text-[#6e6e78] outline-none transition-colors focus:border-[#7a7a85]"

export default function PaymentForm() {
  const [currency, setCurrency] = useState<CurrencyCode>("BDT")
  const [email, setEmail] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")
  const [cardholder, setCardholder] = useState("")
  const [country, setCountry] = useState("Bangladesh")
  const [saveInfo, setSaveInfo] = useState(false)

  function formatCardNumber(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 16)
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ")
  }

  function formatExpiry(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4)
    if (digits.length <= 2) return digits
    return `${digits.slice(0, 2)} / ${digits.slice(2)}`
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0b0b0e] text-[#f0f0f2]">
      {/* Top bar */}
      <header className="mx-auto flex w-full max-w-[920px] items-center justify-between px-4 pt-6 sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="Go back"
            className="flex size-8 items-center justify-center rounded-md text-[#b6b6bd] transition-colors hover:bg-[#1c1c22] hover:text-white"
          >
            <ArrowLeftIcon className="size-4" />
          </Link>

          <div className="flex size-9 items-center justify-center rounded-lg border border-[#2a2a32] bg-[#1a1a1f]">
            <LockIcon className="size-4 text-[#d6d6db]" />
          </div>
        </div>

        <span className="rounded-md border border-[#2a2a32] bg-[#1a1a1f] px-2.5 py-1 text-[10px] font-semibold tracking-widest text-[#9a9aa2]">
          SANDBOX
        </span>
      </header>

      <main className="mx-auto grid w-full max-w-[920px] flex-1 gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px]">
        {/* Left column — order summary */}
        <section>
          <div className="mb-6">
            <p className={`${fieldLabelClass} mb-2`}>Choose a currency:</p>

            <div className="grid grid-cols-2 gap-3">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setCurrency(c.code)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                    currency === c.code
                      ? "border-[#e6e6ea] bg-[#1a1a1f] text-white"
                      : "border-[#2a2a32] bg-[#16161a] text-[#b6b6bd] hover:border-[#3a3a44]"
                  }`}
                >
                  <span aria-hidden>{c.flag}</span>
                  <span className="font-medium">
                    {c.code === "BDT" ? `BDT ${formatAmount("BDT")}` : "$20.00"}
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-2 text-xs text-[#6e6e78] italic">
              1 USD = {EXCHANGE_RATE} BDT
            </p>
          </div>

          <div className="border-t border-[#232329] pt-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-base font-semibold text-white">
                  Hireloop Pro Plan
                </p>

                <p className="mt-1 text-sm text-[#8f8f96]">
                  Access to all features
                </p>
              </div>

              <p className="text-sm font-semibold whitespace-nowrap text-white">
                {currency === "BDT"
                  ? `BDT ${formatAmount("BDT")}`
                  : `$${formatAmount("USD")}`}
              </p>
            </div>
          </div>
        </section>

        {/* Right column — payment form */}
        <section>
          <form
            action="/api/checkout_sessions"
            method="POST"
            className="space-y-5"
          >
            {/* Link express pay */}
            <button
              type="button"
              className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#00d66f] transition-colors hover:bg-[#00c564]"
            >
              <span className="text-sm font-bold text-[#0b2117]">link</span>

              <span className="rounded-[3px] bg-[#1a1f71] px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white italic">
                VISA
              </span>

              <span className="text-xs font-semibold text-[#0b2117]">4242</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-[#2a2a32]" />

              <span className="text-[10px] font-medium tracking-widest text-[#6e6e78]">
                OR
              </span>

              <span className="h-px flex-1 bg-[#2a2a32]" />
            </div>

            {/* Contact information */}
            <div className="space-y-1.5">
              <p className="text-sm font-semibold text-white">
                Contact information
              </p>

              <label className={`${fieldLabelClass} block`} htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="email@example.com"
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Payment method */}
            <div className="space-y-1.5">
              <p className="text-sm font-semibold text-white">Payment method</p>

              <div className="overflow-hidden rounded-lg border border-[#2a2a32] bg-[#16161a]">
                <div className="flex items-center gap-2 border-b border-[#2a2a32] px-3 py-2.5 text-sm font-medium text-white">
                  <CreditCardIcon className="size-4 text-[#b6b6bd]" />
                  Card
                </div>

                <div className="space-y-4 p-3">
                  {/* Card information */}
                  <div className="space-y-2">
                    <p className={fieldLabelClass}>Card information</p>

                    <div className="relative">
                      <input
                        inputMode="numeric"
                        autoComplete="cc-number"
                        placeholder="1234 1234 1234 1234"
                        className={`${inputClass} pr-16`}
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(formatCardNumber(e.target.value))
                        }
                        required
                      />

                      <div className="absolute top-1/2 right-2.5 flex -translate-y-1/2 items-center gap-1">
                        <span className="size-3 rounded-full bg-[#3b82f6]" />
                        <span className="size-3 rounded-full bg-[#22c55e]" />
                        <span className="size-3 rounded-full bg-[#f59e0b]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="MM / YY"
                        className={inputClass}
                        value={expiry}
                        onChange={(e) =>
                          setExpiry(formatExpiry(e.target.value))
                        }
                        required
                      />

                      <div className="relative">
                        <input
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          placeholder="CVC"
                          className={`${inputClass} pr-8`}
                          value={cvc}
                          onChange={(e) =>
                            setCvc(
                              e.target.value.replace(/\D/g, "").slice(0, 4)
                            )
                          }
                          required
                        />

                        <CreditCardIcon className="absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-[#6e6e78]" />
                      </div>
                    </div>
                  </div>

                  {/* Cardholder name */}
                  <div className="space-y-2">
                    <p className={fieldLabelClass}>Cardholder name</p>

                    <input
                      autoComplete="cc-name"
                      placeholder="Full name on card"
                      className={inputClass}
                      value={cardholder}
                      onChange={(e) => setCardholder(e.target.value)}
                      required
                    />
                  </div>

                  {/* Country or region */}
                  <div className="space-y-2">
                    <p className={fieldLabelClass}>Country or region</p>

                    <Select
                      items={COUNTRIES.map((label) => ({
                        value: label,
                        label,
                      }))}
                      value={country}
                      onValueChange={(value) => setCountry(value as string)}
                    >
                      <SelectTrigger className="h-10 w-full border-[#31313a] bg-[#26262e] text-[#f0f0f2] hover:bg-[#26262e] data-[size=default]:h-10">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>

                      <SelectContent className="border-[#2a2a32] bg-[#1a1a1f] text-[#f0f0f2] ring-0">
                        {COUNTRIES.map((c) => (
                          <SelectItem
                            key={c}
                            value={c}
                            className="focus:bg-[#2a2a32] focus:text-white"
                          >
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Save info */}
            <button
              type="button"
              onClick={() => setSaveInfo((prev) => !prev)}
              className="flex w-full items-start gap-3 rounded-lg border border-[#2a2a32] bg-[#16161a] p-3 text-left transition-colors hover:border-[#3a3a44]"
            >
              <span
                className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-sm border transition-colors ${
                  saveInfo
                    ? "border-[#e6e6ea] bg-[#e6e6ea] text-[#0b0b0e]"
                    : "border-[#4a4a54] bg-transparent"
                }`}
              >
                {saveInfo && <CheckIcon className="size-3" />}
              </span>

              <span>
                <span className="block text-xs font-semibold text-white">
                  Save my information for faster checkout
                </span>

                <span className="mt-0.5 block text-xs text-[#8f8f96]">
                  Pay securely on this site and everywhere Link is accepted.
                </span>
              </span>
            </button>

            {/* Pay button */}
            <button
              type="submit"
              role="link"
              className="h-11 w-full rounded-lg bg-[#0570de] text-sm font-semibold text-white transition-colors hover:bg-[#0663c4]"
            >
              Pay
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1c1c22] py-8">
        <p className="text-center text-xs text-[#8f8f96]">
          Powered by{" "}
          <span className="font-semibold text-[#b6b6bd]">Stripe</span>
        </p>

        <div className="mt-3 flex justify-center gap-6 text-xs text-[#6e6e78]">
          <Link href="/" className="transition-colors hover:text-[#b6b6bd]">
            Terms
          </Link>

          <Link href="/" className="transition-colors hover:text-[#b6b6bd]">
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  )
}
