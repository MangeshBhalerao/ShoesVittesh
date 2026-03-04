import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-muted to-card py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                Step Into
                <span className="text-primary block">Your Style</span>
              </h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-md">
                Discover the latest collection of premium sneakers from top brands. Find your perfect pair and elevate
                your street style.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <a href="/men">Shop Now</a>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
                <a href="/women">View Collection</a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center">
              <img
                src="/modern-sneaker-floating-on-clean-background.jpg"
                alt="Featured Sneaker"
                className="w-80 h-80 object-contain drop-shadow-2xl"
              />
            </div>
            {/* Floating elements */}
            <a href="/men" className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
              New Drop
            </a>
            <a href="/women" className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
              Limited Edition
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
