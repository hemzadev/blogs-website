import { Pencil, BookOpen, Film } from "lucide-react";

export default function Hero() {
  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
            WELCOME TO THEDEVBUCKET
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Craft narratives <Pencil className="inline-block h-8 w-8 md:h-10 md:w-10 text-primary" /> that ignite{" "}
            <span className="text-primary">inspiration</span> 💡,{" "}
            <span className="block">
              knowledge <BookOpen className="inline-block h-8 w-8 md:h-10 md:w-10 text-primary" />, and{" "}
              <span className="text-primary">entertainment</span>{" "}
              <Film className="inline-block h-8 w-8 md:h-10 md:w-10 text-primary" />
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our community of developers sharing knowledge, experiences, and insights through engaging articles
            and tutorials.
          </p>
        </div>
      </div>
    </section>
  );
}