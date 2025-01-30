// src/components/layout/blog/data.ts
import type { BlogPost } from './types'

export const blogs: BlogPost[] = Array(12)
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

export const keywords = ["Code", "Data", "Editing", "Design", "AI", "Web Development", "Mobile", "Cloud"] as const