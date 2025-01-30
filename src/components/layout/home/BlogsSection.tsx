import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/common/avatar"
import { Button } from "@/components/common/button"
import { ArrowRight } from "lucide-react"

export function BlogSection() {
  const blogs = Array(6)
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
    }))

  const adSpaces = Array(2)
    .fill(null)
    .map((_, i) => ({
      id: `ad-${i + 1}`,
      content: "Ad Space",
    }))

  const combinedContent = [...blogs, ...adSpaces].sort(() => Math.random() - 0.5)

  return (
    <section className="py-16">
      <div className="container px-4">
        <h2 className="text-3xl font-bold mb-8">Blogs for you</h2>
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-4 grid grid-cols-4 gap-6">
            {combinedContent.map((item, index) =>
              "content" in item ? (
                <div key={item.id} className="bg-muted p-4 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">{item.content}</p>
                </div>
              ) : (
                <Card key={item.id} className="flex flex-col">
                  <CardHeader className="p-4">
                    <div className="aspect-[16/9] relative overflow-hidden rounded-md mb-4">
                      <img src="/placeholder.svg" alt="Blog thumbnail" className="object-cover w-full h-full" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 flex-grow">
                    <CardDescription className="mb-4">{item.description}</CardDescription>
                    <div className="flex items-center mt-auto">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={item.author.avatar} alt={item.author.name} />
                        <AvatarFallback>{item.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <p className="font-medium">{item.author.name}</p>
                        <p className="text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
          <div className="col-span-1">
            {/* Vertical Ad Space */}
            <div className="bg-muted p-4 rounded-lg h-full flex items-center justify-center">
              <p className="text-muted-foreground">Vertical Ad Space</p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-right">
          <Link href="/blog" className="inline-flex items-center text-primary hover:underline">
            See more blogs
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

