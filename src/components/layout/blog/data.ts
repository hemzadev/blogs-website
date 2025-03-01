import { BlogPost } from './types'

export const blogs: BlogPost[] = Array(12)
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
    image: `https://source.unsplash.com/featured/800x600?programming,coding&sig=${i}`,
    category: ["Frontend", "Backend", "DevOps", "Mobile", "AI"][Math.floor(Math.random() * 5)],
    readTime: `${Math.floor(Math.random() * 10) + 5} min read`,
  }))

export const keywords = ["Frontend", "Backend", "DevOps", "Mobile", "AI", "Web Development", "Cloud", "Data Science"]