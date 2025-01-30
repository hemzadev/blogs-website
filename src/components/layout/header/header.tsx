"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/common/button"
import { Settings, Sun, Moon, Laptop, Github, Twitter, Linkedin, Facebook, Instagram, Search } from "lucide-react"
import Image from "next/image"
import { MobileNav } from "@/components/layout/header/mobile-nav"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/common/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/common/avatar"
import { Input } from "@/components/common/input"
import { motion } from "framer-motion"

const themes = [
  { name: "Light", value: "light", icon: Sun },
  { name: "Dark", value: "dark", icon: Moon },
  { name: "System", value: "system", icon: Laptop },
  { name: "GitHub Light", value: "github-light", icon: Github },
  { name: "GitHub Dark", value: "github-dark", icon: Github },
  { name: "GitHub Dimmed", value: "github-dimmed", icon: Github },
]

const socialLinks = [
  { name: "Twitter", icon: Twitter, url: "https://twitter.com" },
  { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com" },
  { name: "Facebook", icon: Facebook, url: "https://facebook.com" },
  { name: "Instagram", icon: Instagram, url: "https://instagram.com" },
]

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://i.ibb.co/p65RCfrS/Copy-of-ERY-1.png"
              alt="TheDevBucket Logo"
              width={200}
              height={70}
              className="h-16 w-auto md:h-20"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-base font-medium text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-base font-medium text-foreground hover:text-primary transition-colors">
              Blog
            </Link>
            <Link
              href="/drives"
              className="text-base font-medium text-foreground hover:text-primary transition-colors flex items-center relative"
            >
              Drives
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute -top-2 -right-4"
              >
                <Image src="/google-drive-logo.png" alt="Google Drive Logo" width={20} height={20} />
              </motion.div>
            </Link>
            <Button asChild className="rounded-full">
              <Link href="/subscribe">Subscribe</Link>
            </Button>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input type="search" placeholder="Search..." className="w-[200px] pr-8" />
              <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <div className="flex items-center">
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Theme</span>
                    </div>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {themes.map((item) => (
                      <DropdownMenuItem key={item.value} onClick={() => setTheme(item.value)}>
                        <div className="flex items-center">
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.name}</span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Social Media</DropdownMenuLabel>
                {socialLinks.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.name}</span>
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>DB</AvatarFallback>
            </Avatar>

            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}