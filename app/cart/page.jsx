"use client"

import { useEffect, useState, useTransition } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  const [items, setItems] = useState([])
  const [isPending, startTransition] = useTransition()

  const loadCart = () => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data.items) ? data.items : [])
      })
      .catch(() => {})
  }

  useEffect(() => {
    loadCart()
  }, [])

  const handleRemove = (id) => {
    startTransition(async () => {
      await fetch(`/api/cart?itemId=${id}`, { method: "DELETE" })
      loadCart()
    })
  }

  const handleCheckout = () => {
    startTransition(async () => {
      const res = await fetch("/api/checkout", { method: "POST" })
      if (res.ok) {
        loadCart()
      }
    })
  }

  const total = items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0)

  return (
    <main className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold">Your Cart</h1>
            <p className="text-muted-foreground">Review your items and proceed to checkout.</p>
          </div>
          <Link href="/men" className="text-sm text-primary hover:underline">
            Keep shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="rounded-lg border bg-card p-6 text-center">
            <p className="text-muted-foreground mb-4">Your cart is empty.</p>
            <Button asChild>
              <Link href="/men">Browse sneakers</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 rounded-lg border bg-card p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      className="h-16 w-16 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity} × ${Number(item.product.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-sm font-semibold">
                      ${(Number(item.product.price) * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={isPending}
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 rounded-lg border bg-card p-6">
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex items-center justify-between text-base font-semibold border-t pt-3">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button className="w-full mt-2" disabled={isPending || items.length === 0} onClick={handleCheckout}>
                Complete Purchase
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

