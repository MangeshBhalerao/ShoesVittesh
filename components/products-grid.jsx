"use client"

import { useTransition, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Star, ShoppingCart } from "lucide-react"

export default function ProductsGrid({ products }) {
  const [cartCount, setCartCount] = useState(0)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    // fetch current cart to show approximate count
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.items)) {
          const total = data.items.reduce((sum, item) => sum + item.quantity, 0)
          setCartCount(total)
        }
      })
      .catch(() => {})
  }, [])

  const handleAddToCart = (productId) => {
    startTransition(async () => {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      })

      if (!res.ok) {
        toast.error("Could not add to cart. Please try again.")
        return
      }

      setCartCount((count) => count + 1)

      toast.custom((id) => (
        <div className="flex flex-col gap-3 rounded-md border bg-background p-4 shadow-lg">
          <div className="text-sm font-medium">Added to cart</div>
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                toast.dismiss(id)
              }}
            >
              Keep shopping
            </Button>
            <Button
              size="sm"
              onClick={() => {
                toast.dismiss(id)
                router.push("/cart")
              }}
            >
              Go to cart
            </Button>
          </div>
        </div>
      ))
    })
  }

  if (!products?.length) {
    return <p className="text-muted-foreground">No products available yet.</p>
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-background"
          >
            <CardContent className="p-0">
              <div className="relative aspect-square bg-card rounded-t-lg overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-background/80 hover:bg-background"
                >
                  <Heart className="h-4 w-4" />
                </Button>

                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isFeatured && (
                    <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-semibold">
                      Featured
                    </span>
                  )}
                  {product.isOnSale && (
                    <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-semibold">
                      Sale
                    </span>
                  )}
                  {product.isPopular && (
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold">
                      Popular
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                  <h3 className="font-semibold text-balance">{product.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-medium ml-1">{product.rating?.toFixed(1) ?? "0.0"}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews ?? 0})</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">${Number(product.price).toFixed(2)}</span>
                  {product.originalPrice && Number(product.originalPrice) > 0 && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${Number(product.originalPrice).toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-muted-foreground">
                    Colors: {Array.isArray(product.colors) ? product.colors.length : 0}
                  </span>
                  <Button
                    className="flex items-center gap-2"
                    size="sm"
                    disabled={isPending}
                    onClick={() => handleAddToCart(product.id)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

