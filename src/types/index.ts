export interface BlogPost {
    id: string
    title: string
    description: string
    thumbnail: string
    author: {
      name: string
      avatar: string
    }
    publishedAt: string
    slug: string
}