"use client"
import { ArrowRight, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/common/avatar"
import { DriveFolder } from "@/components/common/DriveFolder"
import { Button } from "@/components/common/button"
import { Input } from "@/components/common/input"
import { ParticlesBackground } from "@/components/common/ParticlesBackground"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export function Hero() {
  const [searchFocused, setSearchFocused] = useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const blogs = Array(3)
    .fill(null)
    .map((_, i) => ({
      id: i + 1,
      title: `Blog Post ${i + 1}`,
      description: "A deep dive into modern web development techniques and best practices.",
      author: {
        name: `Author ${i + 1}`,
        avatar: "/placeholder.svg",
      },
      date: "Jan 1, 2024",
      image: `https://source.unsplash.com/random/800x600?tech,coding?sig=${i}`,
    }))

  const driveFolders = [
    { name: "Tutorial Projects", size: "lg" as const, count: 3210, featured: true },
    { name: "Development Resources", size: "lg" as const, count: 15234 },
    { name: "Code Snippets", size: "sm" as const, count: 8976 },
    { name: "Tech Articles", size: "md" as const, count: 12543 },
    { name: "Web Development", size: "md" as const, count: 9876 },
    { name: "Learning Paths", size: "lg" as const, count: 5432 },
  ]

  if (!mounted) return null

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white" : "bg-gradient-to-b from-gray-100 via-white to-gray-100 text-gray-900"} py-16 px-4 overflow-hidden`}
    >
      <ParticlesBackground />

      <section className="relative max-w-[95vw] mx-auto rounded-[2.5rem] overflow-hidden">
        <div
          className={`absolute inset-0 ${theme === "dark" ? "bg-white/[0.03]" : "bg-black/[0.03]"} backdrop-blur-xl border border-white/[0.05] rounded-[2.5rem]`}
        ></div>

        <div className="relative p-8">
          {/* Search bar */}
          <div className={`absolute top-8 right-8 transition-all duration-300 ${searchFocused ? "w-64" : "w-48"}`}>
            <Input
              type="search"
              placeholder="Search..."
              className={`pl-10 pr-4 py-2 ${theme === "dark" ? "bg-white/10 border-white/20 text-white placeholder-white/50" : "bg-black/10 border-black/20 text-black placeholder-black/50"}`}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === "dark" ? "text-white/50" : "text-black/50"}`}
              size={18}
            />
          </div>

          {/* Drive folders */}
          {driveFolders.map((folder, index) => (
            <div
              key={folder.name}
              className={`absolute ${getFolderPosition(index)} transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 z-10`}
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: "float 6s ease-in-out infinite",
              }}
            >
              <DriveFolder
                name={folder.name}
                size={folder.size}
                count={folder.count}
                className={
                  folder.featured
                    ? `ring-2 ring-primary ring-offset-4 ${theme === "dark" ? "ring-offset-gray-900" : "ring-offset-white"}`
                    : ""
                }
              />
            </div>
          ))}

          {/* Main content */}
          <div className="relative z-20 container mx-auto px-4 py-32">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-none mb-8">
                <span className="block text-primary">Your Ultimate</span>
                <span className="block text-primary">Resource Hub</span>
              </h1>
              <p
                className={`text-xl md:text-2xl ${theme === "dark" ? "text-gray-300" : "text-gray-700"} max-w-3xl mx-auto mb-12`}
              >
                <span className="block mb-2">Discover tools, guides, and inspiration</span>
                <span className="block">across various tech domains</span>
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/blog">
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Blog cards */}
          {blogs.map((blog, index) => (
            <Card
              key={blog.id}
              className={`absolute w-72 ${theme === "dark" ? "bg-white/[0.05]" : "bg-black/[0.05]"} backdrop-blur-md p-4 transform shadow-2xl border border-white/[0.05] rounded-lg ${getCardPosition(index)}`}
              style={{
                animationDelay: `${index * 0.2}s`,
                animation: "floatCard 8s ease-in-out infinite",
              }}
            >
              <CardHeader className="p-0">
                <div className="aspect-video relative overflow-hidden rounded-lg mb-3">
                  <Image
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
                    className="object-cover transition-transform hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, 288px"
                    priority={index === 0}
                  />
                </div>
                <CardTitle className={`text-lg ${theme === "dark" ? "text-white/90" : "text-black/90"}`}>
                  {blog.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-3">
                <CardDescription className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-4`}>
                  {blog.description}
                </CardDescription>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2 border-2 border-white/10">
                    <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                    <AvatarFallback className="bg-primary">{blog.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-xs">
                    <p className={`font-medium ${theme === "dark" ? "text-white/90" : "text-black/90"}`}>
                      {blog.author.name}
                    </p>
                    <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>{blog.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

function getCardPosition(index: number) {
  const positions = ["-top-10 -right-10 rotate-6", "bottom-20 -left-20 -rotate-3", "top-1/3 -right-20 rotate-12"]
  return positions[index]
}

function getFolderPosition(index: number) {
  const positions = [
    "top-10 left-20 rotate-3",
    "bottom-32 right-16 -rotate-3",
    "top-1/3 right-1/4 rotate-6",
    "top-20 right-20 -rotate-6",
    "bottom-20 left-32 rotate-3",
    "bottom-1/4 left-1/4 -rotate-3",
  ]
  return positions[index]
}

