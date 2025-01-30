"use client"
import { Pencil, BookOpen, Film, ArrowRight, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/common/avatar"
import { DriveFolder } from "@/components/common/DriveFolder"
import { Button } from "@/components/common/button"
import { Input } from "@/components/common/input"
import { ParticlesBackground } from "@/components/common/ParticlesBackground"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

const digitalResources = [
  { icon: "/icons/Pdf.png", name: "PDF" },
  { icon: "/icons/canva_icon.png", name: "Canva" },
  { icon: "/icons/code_icon.png", name: "Code" },
  { icon: "/icons/photoshop_icon.png", name: "Photoshop" },
  { icon: "/icons/after_effects_icon.png", name: "After Effects" },
]

export default function Hero() {
  const [searchFocused, setSearchFocused] = useState(false)
  const [topResources, setTopResources] = useState<typeof digitalResources>([])
  const [bottomResources, setBottomResources] = useState<typeof digitalResources>([])

  useEffect(() => {
    const shuffled = [...digitalResources].sort(() => 0.5 - Math.random())
    setTopResources(shuffled.slice(0, 3))
    setBottomResources(shuffled.slice(3, 5))
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4 overflow-hidden">
      <ParticlesBackground />

      <section className="relative max-w-[95vw] mx-auto rounded-[2.5rem] overflow-hidden">
        {/* Glass background */}
        <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] rounded-[2.5rem]"></div>

        {/* Background glow effects */}
        <div className="absolute -left-20 -top-20 w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-[128px]"></div>
        <div className="absolute -right-20 -bottom-20 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-[128px]"></div>

        {/* Content wrapper */}
        <div className="relative p-8">
          {/* Floating search bar */}
          <div className={`absolute top-8 right-8 transition-all duration-300 ${searchFocused ? "w-64" : "w-48"}`}>
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-white/10 border-white/20 text-white placeholder-white/50"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
          </div>

          {/* Google Drive folders */}
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
                className={folder.featured ? "ring-2 ring-yellow-400 ring-offset-4 ring-offset-gray-900" : ""}
              />
            </div>
          ))}

                    {/* Floating resources from top */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            {/* Add the hole effect */}
            <div className="w-16 h-16 bg-blue-400/20 rounded-full blur-lg absolute top-0 left-1/2 -translate-x-1/2"></div>
            <div className="w-8 h-8 bg-blue-300/40 rounded-full absolute top-2 left-1/2 -translate-x-1/2"></div>
            
            <div className="relative w-80 h-60">
              {topResources.map((resource, index) => {
                const angle = (index * 72) // 360/5 = 72 degrees between each icon
                const radius = 80 // Distance from center
                const x = radius * Math.cos((angle * Math.PI) / 180)
                const y = radius * Math.sin((angle * Math.PI) / 180)
                
                return (
                  <div
                    key={resource.name}
                    className="absolute transition-all duration-500"
                    style={{
                      left: `${x + 40}px`,
                      top: `${y + 40}px`,
                      transform: `rotate(${angle}deg)`,
                      animation: 'floatIconFromHole 6s ease-in-out infinite',
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    <Image 
                      src={resource.icon} 
                      alt={resource.name} 
                      width={32} 
                      height={32} 
                      className="drop-shadow-lg"
                    />
                    <div className="absolute w-px h-20 bg-gradient-to-b from-blue-400/50 to-transparent" 
                        style={{
                          transformOrigin: 'top',
                          transform: `rotate(${-angle}deg)`
                        }}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Floating resources from bottom */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <div className="relative w-80 h-60">
              {bottomResources.map((resource, index) => (
                <div
                  key={resource.name}
                  className="absolute"
                  style={{
                    bottom: `${20 + index * 20}px`,
                    left: `${40 + (index - 0.5) * 40}px`,
                    transform: `rotate(${(index - 0.5) * -30}deg)`,
                    transformOrigin: "top center",
                    animation: `floatIcon 10s ease-in-out infinite`,
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  <Image src={resource.icon || "/placeholder.svg"} alt={resource.name} width={32} height={32} />
                  <svg
                    className="absolute bottom-full left-1/2 -translate-x-1/2"
                    width="2"
                    height="60"
                    overflow="visible"
                  >
                    <path d={`M1,60 Q1,30 1,0`} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="relative z-20 container mx-auto px-4 py-32 flex flex-col items-center text-center">
            <div
              className="inline-block text-sm font-medium px-4 py-1.5 bg-blue-600/20 text-blue-400 rounded-full mb-8"
              style={{ animation: "slideDown 0.5s ease-out" }}
            >
              WELCOME TO THEDEVBUCKET
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight mb-8"
              style={{ animation: "slideUp 0.5s ease-out 0.2s both" }}
            >
              Craft narratives <Pencil className="inline-block h-8 w-8 md:h-10 md:w-10 text-blue-400" /> that ignite{" "}
              <span className="text-blue-400">inspiration</span> 💡,{" "}
              <span className="block mt-2">
                knowledge <BookOpen className="inline-block h-8 w-8 md:h-10 md:w-10 text-blue-400" />, and{" "}
                <span className="text-blue-400">entertainment</span>{" "}
                <Film className="inline-block h-8 w-8 md:h-10 md:w-10 text-blue-400" />
              </span>
            </h1>
            <p
              className="text-xl text-gray-300 max-w-2xl mx-auto mb-12"
              style={{ animation: "slideUp 0.5s ease-out 0.4s both" }}
            >
              Join our community of developers sharing knowledge, experiences, and insights through engaging articles
              and tutorials. Access over <span className="text-blue-400 font-bold">50,000+</span> resources for free!
            </p>
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-blue-600/25 transition-all duration-300"
              style={{ animation: "slideUp 0.5s ease-out 0.6s both" }}
            >
              <Link href="/blog">
                Start Exploring
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Floating blog cards */}
          {blogs.map((blog, index) => (
            <Card
              key={blog.id}
              className={`absolute w-72 bg-white/[0.05] backdrop-blur-md p-4 transform shadow-2xl border border-white/[0.05] ${getCardPosition(index)}`}
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
                <CardTitle className="text-lg text-white/90">{blog.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-3">
                <CardDescription className="text-sm text-gray-300 mb-4">{blog.description}</CardDescription>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2 border-2 border-white/10">
                    <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                    <AvatarFallback className="bg-blue-600">{blog.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-xs">
                    <p className="font-medium text-white/90">{blog.author.name}</p>
                    <p className="text-gray-400">{blog.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Job titles */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-30">
          <div className="bg-blue-600/20 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-sm font-medium text-white mr-2">Front-end Developer</span>
            <span className="text-sm font-medium text-white mr-2">Software Engineer</span>
            <span className="text-sm font-medium text-white">Back-end Developer</span>
          </div>
          <div className="bg-blue-600/20 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-sm font-medium text-white mr-2">Video Editor</span>
            <span className="text-sm font-medium text-white mr-2">Data Scientist</span>
            <span className="text-sm font-medium text-white">Game Developer</span>
          </div>
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
    "top-10 left-20 rotate-3", // Tutorial Projects
    "bottom-32 right-16 -rotate-3",
    "top-1/3 right-1/4 rotate-6",
    "top-20 right-20 -rotate-6",
    "bottom-20 left-32 rotate-3",
    "bottom-1/4 left-1/4 -rotate-3",
  ]
  return positions[index]
}

export { Hero }

