import { Input } from "@/components/common/input";
import { Button } from "@/components/common/button";

export default function Newsletter() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get the latest articles and news delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <Input type="email" placeholder="Enter your email" className="flex-grow" required />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
    </section>
  );
}