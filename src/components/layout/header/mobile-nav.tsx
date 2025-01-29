"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/common/button"
import { Menu, X } from "lucide-react"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" className="hover:bg-primary/10" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="container p-6">
            <div className="flex flex-col space-y-4">
              <Link href="/stories" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
                Stories
              </Link>
              <Link href="/creator" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
                Creator
              </Link>
              <Link
                href="/community"
                className="text-lg font-medium hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Community
              </Link>
              <Link
                href="/subscribe"
                className="text-lg font-medium hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Subscribe
              </Link>
              <Button className="w-full" onClick={() => setIsOpen(false)}>
                Write
              </Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}

