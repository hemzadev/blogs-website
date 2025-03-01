"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/card"
import type { BlogCardProps } from "./types"

export function BlogCard({ blog, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <Image
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            fill
            className="object-cover transition-transform hover:scale-110 duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {blog.category}
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-xl font-bold line-clamp-2 hover:text-blue-600 transition-colors">
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </CardTitle>
          <CardDescription className="line-clamp-2">{blog.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Image
                src={blog.author.avatar || "/placeholder.svg"}
                alt={blog.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm font-medium">{blog.author.name}</span>
            </div>
            <span className="text-sm text-muted-foreground">{blog.date}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{blog.readTime}</span>
            <Link
              href={`/blog/${blog.id}`}
              className="text-blue-600 hover:text-blue-800 inline-flex items-center transition-colors"
            >
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}