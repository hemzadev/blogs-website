// src/components/layout/blog/Blog.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/card"
import { Input } from "@/components/common/input"
import { Button } from "@/components/common/button"
import { Search, ArrowRight } from "lucide-react"

// Mock data for blogs
const blogs = Array(12)
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
    category: ["Code", "Data", "Editing", "Design", "AI"][Math.floor(Math.random() * 5)],
  }))

// Keywords for search
const keywords = ["Code", "Data", "Editing", "Design", "AI", "Web Development", "Mobile", "Cloud"]

export function Blog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedKeyword, setSelectedKeyword] = useState("")

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(selectedKeyword.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Articles</h1>

      {/* Search and keywords section */}
      <div className="mb-8">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-10 pr-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {keywords.map((keyword) => (
            <Button
              key={keyword}
              variant="outline"
              size="sm"
              onClick={() => setSelectedKeyword(keyword)}
              className={selectedKeyword === keyword ? "bg-primary text-primary-foreground" : ""}
            >
              {keyword}
            </Button>
          ))}
        </div>
      </div>

      {/* Blog cards and ad spaces */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog, index) => {
          // Insert ad space after every 3rd blog post
          const adSpace = (index + 1) % 3 === 0 && (
            <div key={`ad-${index}`} className="col-span-1 md:col-span-2 lg:col-span-3">
              <div className="bg-muted p-4 rounded-lg flex items-center justify-center h-32">
                <p className="text-muted-foreground">Ad Space</p>
              </div>
            </div>
          )

          // Insert subscribe section after every 6th blog post
          const subscribeSection = (index + 1) % 6 === 0 && (
            <div key={`subscribe-${index}`} className="col-span-1 md:col-span-2 lg:col-span-3">
              <Card className="bg-primary text-primary-foreground p-6">
                <CardHeader>
                  <CardTitle>Subscribe to Our Newsletter</CardTitle>
                  <CardDescription className="text-primary-foreground/80">
                    Get the latest articles delivered right to your inbox.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="flex gap-2">
                    <Input type="email" placeholder="Enter your email" className="bg-primary-foreground text-primary" />
                    <Button type="submit" variant="secondary">
                      Subscribe
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )

          return (
            <div key={blog.id}>
              <Card>
                <CardHeader>
                  <div className="aspect-video relative overflow-hidden rounded-lg mb-3">
                    <Image
                      src={blog.image || "/placeholder.svg"}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardTitle>{blog.title}</CardTitle>
                  <CardDescription>{blog.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={blog.author.avatar || "/placeholder.svg"}
                        alt={blog.author.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-sm text-muted-foreground">{blog.author.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{blog.date}</span>
                  </div>
                  <div className="mt-4">
                    <Link href={`/blog/${blog.id}`} className="text-primary hover:underline inline-flex items-center">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
              {adSpace}
              {subscribeSection}
            </div>
          )
        })}
      </div>
    </div>
  )
}