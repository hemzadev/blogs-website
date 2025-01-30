// app/blog/page.tsx
import { Metadata } from 'next'
import { BlogPage } from "@/components/layout/blog/BlogPage"

export const metadata: Metadata = {
  title: 'Blog - TheDevBucket',
  description: 'Explore our latest articles about web development, coding, and technology.',
}

export default function Page() {
  return <BlogPage />
}