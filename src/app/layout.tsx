import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/layout/theme-provider"
import Header from "@/components/layout/header/header"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "TheDevBucket",
  description: "A modern blog for software engineering content",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen max-w-[2000px] mx-auto">
            <Header />
            <main className="flex-grow pt-20">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

