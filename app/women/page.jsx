import { prisma } from "@/lib/prisma"
import ProductsGrid from "@/components/products-grid"

export const metadata = {
  title: "Women’s Sneakers | SneakPeak",
}

export const dynamic = "force-dynamic"

export default async function WomenPage() {
  let products = []

  try {
    products = await prisma.product.findMany({
      where: {
        OR: [{ gender: "WOMEN" }, { gender: "UNISEX" }],
      },
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.error("Failed to load women products", error)
  }

  return (
    <main className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-balance mb-2">Women&apos;s Sneakers</h1>
          <p className="text-muted-foreground">
            Discover stylish and comfortable women&apos;s sneakers for every occasion.
          </p>
        </div>

        <ProductsGrid products={products} />
      </div>
    </main>
  )
}

