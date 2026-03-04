import Hero from "@/components/hero"
import FeaturedProducts from "@/components/featured-products"
import Categories from "@/components/categories"
import Newsletter from "@/components/newsletter"

export const dynamic = "force-dynamic"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Newsletter />
    </>
  )
}
