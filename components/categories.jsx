import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Running",
    image: "/running-sneakers-athletic-shoes.jpg",
    count: "120+ styles",
    href: "/men",
  },
  {
    name: "Basketball",
    image: "/basketball-sneakers-high-top-shoes.jpg",
    count: "85+ styles",
    href: "/men",
  },
  {
    name: "Lifestyle",
    image: "/casual-lifestyle-sneakers-everyday-shoes.jpg",
    count: "200+ styles",
    href: "/women",
  },
  {
    name: "Skateboarding",
    image: "/skateboarding-sneakers-skate-shoes.jpg",
    count: "60+ styles",
    href: "/men",
  },
]

export default function Categories() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Shop by Category</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Find the perfect sneakers for every activity and style preference
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <a key={category.name} href={category.href} className="block">
              <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-card h-full">
                <CardContent className="p-6">
                  <div className="aspect-square bg-muted rounded-xl mb-4 overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-muted-foreground">{category.count}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
