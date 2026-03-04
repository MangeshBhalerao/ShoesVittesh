import { prisma } from "@/lib/prisma"
import ProductsGrid from "@/components/products-grid"

export default async function FeaturedProducts() {
  let products = []

  try {
    products = await prisma.product.findMany({
      where: {
        isFeatured: true,
      },
      orderBy: { createdAt: "desc" },
      take: 8,
    })
  } catch (error) {
    console.error("Failed to load featured products", error)
  }

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Featured Products</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Handpicked selection of the most popular and trending sneakers
          </p>
        </div>

        <ProductsGrid products={products} />

        <div className="text-center mt-12">
          <a
            href="/men"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-lg font-medium text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  )
}
