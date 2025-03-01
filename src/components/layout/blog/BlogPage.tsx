"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/card"
import { Input } from "@/components/common/input"
import { Button } from "@/components/common/button"
import { Search, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { ParticlesBackground } from "@/components/common/ParticlesBackground"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/common/avatar"

// Mock data for blogs (unchanged)
const blogs = Array(12)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    title: `Exploring ${["React", "Next.js", "TypeScript", "TailwindCSS", "Node.js"][i % 5]} - Part ${Math.floor(i / 5) + 1}`,
    description: "Dive deep into modern web development techniques and best practices with our comprehensive guide.",
    author: {
      name: `${["Sarah", "John", "Emily", "Michael", "Jessica"][i % 5]} ${["Smith", "Doe", "Johnson", "Brown", "Davis"][i % 5]}`,
      avatar: `/avatars/avatar-${(i % 5) + 1}.jpg`,
    },
    date: `${["Jan", "Feb", "Mar", "Apr", "May"][i % 5]} ${i + 1}, 2024`,
    image: `/placeholder.svg`,
    category: ["Frontend", "Backend", "DevOps", "Mobile", "AI"][Math.floor(Math.random() * 5)],
  }))

// Keywords for search
const keywords = ["Frontend", "Backend", "DevOps", "Mobile", "AI", "Web Development", "Cloud", "Data Science"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedKeyword, setSelectedKeyword] = useState("")
  const [filteredBlogs, setFilteredBlogs] = useState(blogs)

  useEffect(() => {
    const filtered = blogs.filter(
      (blog) =>
        (blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedKeyword === "" || blog.category === selectedKeyword),
    )
    setFilteredBlogs(filtered)
  }, [searchTerm, selectedKeyword])

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <ParticlesBackground />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Our Blog
        </motion.h1>

        {/* Search and keywords section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative max-w-2xl mx-auto mb-6">
            <Input
              type="search"
              placeholder="Search articles..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {keywords.map((keyword) => (
              <Button
                key={keyword}
                variant={selectedKeyword === keyword ? "secondary" : "outline"}
                size="sm"
                onClick={() => setSelectedKeyword(keyword === selectedKeyword ? "" : keyword)}
              >
                {keyword}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Blog grid */}
        <div className="grid grid-cols-4 gap-6">
          {/* Row 1: 4 blog cards */}
          {filteredBlogs.slice(0, 4).map((blog) => (
            <Card key={blog.id} className="flex flex-col">
              <CardHeader className="p-4">
                <div className="aspect-[16/9] relative overflow-hidden rounded-md mb-4">
                  <img src="/placeholder.svg" alt="Blog thumbnail" className="object-cover w-full h-full" />
                </div>
                <CardTitle className="text-lg">{blog.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow">
                <CardDescription className="mb-4">{blog.description}</CardDescription>
                <div className="flex items-center mt-auto">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                    <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium">{blog.author.name}</p>
                    <p className="text-muted-foreground">{blog.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Row 2: Blog card, Ad card, Blog card, Vertical Ad */}
          <Card className="flex flex-col">
            <CardHeader className="p-4">
              <div className="aspect-[16/9] relative overflow-hidden rounded-md mb-4">
                <img src="/placeholder.svg" alt="Blog thumbnail" className="object-cover w-full h-full" />
              </div>
              <CardTitle className="text-lg">{filteredBlogs[4].title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
              <CardDescription className="mb-4">{filteredBlogs[4].description}</CardDescription>
              <div className="flex items-center mt-auto">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={filteredBlogs[4].author.avatar} alt={filteredBlogs[4].author.name} />
                  <AvatarFallback>{filteredBlogs[4].author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{filteredBlogs[4].author.name}</p>
                  <p className="text-muted-foreground">{filteredBlogs[4].date}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="bg-muted p-4 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Ad Space 1</p>
          </div>
          <Card className="flex flex-col">
            <CardHeader className="p-4">
              <div className="aspect-[16/9] relative overflow-hidden rounded-md mb-4">
                <img src="/placeholder.svg" alt="Blog thumbnail" className="object-cover w-full h-full" />
              </div>
              <CardTitle className="text-lg">{filteredBlogs[5].title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
              <CardDescription className="mb-4">{filteredBlogs[5].description}</CardDescription>
              <div className="flex items-center mt-auto">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={filteredBlogs[5].author.avatar} alt={filteredBlogs[5].author.name} />
                  <AvatarFallback>{filteredBlogs[5].author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{filteredBlogs[5].author.name}</p>
                  <p className="text-muted-foreground">{filteredBlogs[5].date}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="bg-muted p-4 rounded-lg flex items-center justify-center col-span-1 row-span-3">
            <p className="text-muted-foreground">Vertical Ad Space</p>
          </div>

          {/* Row 3: Blog card, Blog card, Ad card, Vertical Ad */}
          <Card className="flex flex-col">
            <CardHeader className="p-4">
              <div className="aspect-[16/9] relative overflow-hidden rounded-md mb-4">
                <img src="/placeholder.svg" alt="Blog thumbnail" className="object-cover w-full h-full" />
              </div>
              <CardTitle className="text-lg">{filteredBlogs[6].title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
              <CardDescription className="mb-4">{filteredBlogs[6].description}</CardDescription>
              <div className="flex items-center mt-auto">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={filteredBlogs[6].author.avatar} alt={filteredBlogs[6].author.name} />
                  <AvatarFallback>{filteredBlogs[6].author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{filteredBlogs[6].author.name}</p>
                  <p className="text-muted-foreground">{filteredBlogs[6].date}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader className="p-4">
              <div className="aspect-[16/9] relative overflow-hidden rounded-md mb-4">
                <img src="/placeholder.svg" alt="Blog thumbnail" className="object-cover w-full h-full" />
              </div>
              <CardTitle className="text-lg">{filteredBlogs[7].title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
              <CardDescription className="mb-4">{filteredBlogs[7].description}</CardDescription>
              <div className="flex items-center mt-auto">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={filteredBlogs[7].author.avatar} alt={filteredBlogs[7].author.name} />
                  <AvatarFallback>{filteredBlogs[7].author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{filteredBlogs[7].author.name}</p>
                  <p className="text-muted-foreground">{filteredBlogs[7].date}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="bg-muted p-4 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Ad Space 2</p>
          </div>

          {/* Row 4: Ad card, Blog card, Blog card, Vertical Ad */}
          <div className="bg-muted p-4 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Ad Space 3</p>
          </div>
          <Card className="flex flex-col">
            <CardHeader className="p-4">
              <div className="aspect-[16/9] relative overflow-hidden rounded-md mb-4">
                <img src="/placeholder.svg" alt="Blog thumbnail" className="object-cover w-full h-full" />
              </div>
              <CardTitle className="text-lg">{filteredBlogs[8].title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
              <CardDescription className="mb-4">{filteredBlogs[8].description}</CardDescription>
              <div className="flex items-center mt-auto">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={filteredBlogs[8].author.avatar} alt={filteredBlogs[8].author.name} />
                  <AvatarFallback>{filteredBlogs[8].author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{filteredBlogs[8].author.name}</p>
                  <p className="text-muted-foreground">{filteredBlogs[8].date}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader className="p-4">
              <div className="aspect-[16/9] relative overflow-hidden rounded-md mb-4">
                <img src="/placeholder.svg" alt="Blog thumbnail" className="object-cover w-full h-full" />
              </div>
              <CardTitle className="text-lg">{filteredBlogs[9].title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
              <CardDescription className="mb-4">{filteredBlogs[9].description}</CardDescription>
              <div className="flex items-center mt-auto">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={filteredBlogs[9].author.avatar} alt={filteredBlogs[9].author.name} />
                  <AvatarFallback>{filteredBlogs[9].author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{filteredBlogs[9].author.name}</p>
                  <p className="text-muted-foreground">{filteredBlogs[9].date}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Row 5: 4 blog cards */}
          {filteredBlogs.slice(10, 14).map((blog) => (
            <Card key={blog.id} className="flex flex-col">
              <CardHeader className="p-4">
                <div className="aspect-[16/9] relative overflow-hidden rounded-md mb-4">
                  <img src="/placeholder.svg" alt="Blog thumbnail" className="object-cover w-full h-full" />
                </div>
                <CardTitle className="text-lg">{blog.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow">
                <CardDescription className="mb-4">{blog.description}</CardDescription>
                <div className="flex items-center mt-auto">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                    <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium">{blog.author.name}</p>
                    <p className="text-muted-foreground">{blog.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}