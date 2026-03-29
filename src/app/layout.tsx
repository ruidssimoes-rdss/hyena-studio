import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { TokenProvider } from "@/tokens/provider"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Hyena Studio",
  description: "A design system that thinks.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="hyena-chrome min-h-full flex flex-col">
        <TokenProvider>{children}</TokenProvider>
      </body>
    </html>
  )
}
