import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Newsletter() {
  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Stay in the Loop</h2>
          <p className="text-lg text-primary-foreground/80 text-pretty mb-8">
            Get notified about new releases, exclusive drops, and special offers. Join our community of sneaker
            enthusiasts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-primary-foreground text-foreground border-0 flex-1"
            />
            <Button variant="secondary" size="lg" className="px-8">
              Subscribe
            </Button>
          </div>

          <p className="text-sm text-primary-foreground/60 mt-4">No spam, unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  )
}
