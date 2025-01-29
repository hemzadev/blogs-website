import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/common/avatar";

export default function BlogSection() {
  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Tabs defaultValue="recent" className="w-full">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Latest Stories</h2>
                <TabsList className="grid w-[200px] grid-cols-2">
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="recent">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="group hover:shadow-lg transition-shadow border-none bg-background">
                      <CardHeader className="p-0">
                        <div className="aspect-[16/9] relative overflow-hidden rounded-t-lg">
                          <img
                            src="/placeholder.svg"
                            alt="Article thumbnail"
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg" alt="Author" />
                            <AvatarFallback>AU</AvatarFallback>
                          </Avatar>
                          <div className="text-sm">
                            <p className="font-medium">Author Name</p>
                            <p className="text-muted-foreground">Dec 28, 2023</p>
                          </div>
                        </div>
                        <CardTitle className="mb-2 group-hover:text-primary transition-colors">
                          <Link href={`/blog/${i}`}>Understanding TypeScript Generics</Link>
                        </CardTitle>
                        <CardDescription>
                          A deep dive into TypeScript generics and their practical applications in modern web
                          development.
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="popular">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[4, 5, 6].map((i) => (
                    <Card key={i} className="group hover:shadow-lg transition-shadow border-none bg-background">
                      <CardHeader className="p-0">
                        <div className="aspect-[16/9] relative overflow-hidden rounded-t-lg">
                          <img
                            src="/placeholder.svg"
                            alt="Article thumbnail"
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg" alt="Author" />
                            <AvatarFallback>AU</AvatarFallback>
                          </Avatar>
                          <div className="text-sm">
                            <p className="font-medium">Author Name</p>
                            <p className="text-muted-foreground">Dec 20, 2023</p>
                          </div>
                        </div>
                        <CardTitle className="mb-2 group-hover:text-primary transition-colors">
                          <Link href={`/blog/${i}`}>Popular TypeScript Patterns</Link>
                        </CardTitle>
                        <CardDescription>
                          Explore the most widely used TypeScript patterns and how they can improve your code quality.
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}