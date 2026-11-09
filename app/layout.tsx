import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <Toaster
          position="top-right"
          style={
            {
              "--normal-bg": "#16161d",
              "--normal-text": "#ffffff",
              "--normal-border": "#2a2a35",

              "--success-bg": "#16161d",
              "--success-text": "#ffffff",
              "--success-border": "#2a2a35",

              "--error-bg": "#16161d",
              "--error-text": "#ffffff",
              "--error-border": "#2a2a35",

              "--info-bg": "#16161d",
              "--info-text": "#ffffff",
              "--info-border": "#2a2a35",

              "--warning-bg": "#16161d",
              "--warning-text": "#ffffff",
              "--warning-border": "#2a2a35",
            } as React.CSSProperties
          }
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
