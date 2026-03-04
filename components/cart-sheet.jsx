"use client"

import { useEffect, useState, useTransition } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function CartSheet() {
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
        setItems([])
      }
    })
  }

  const total = items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0)
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {count}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex-1 space-y-4 overflow-auto">
          {items.length === 0 ? (
            <p className="text-muted-foreground">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 border-b pb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium text-sm">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.quantity} × ${Number(item.product.price).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="text-sm font-semibold">
                    ${(Number(item.product.price) * item.quantity).toFixed(2)}
                  </p>
                  <Button
                    variant="ghost"
                    size="xs"
                    className="h-6 px-2 text-xs"
                    disabled={isPending}
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-4 border-t pt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <Button className="w-full" disabled={isPending || items.length === 0} onClick={handleCheckout}>
            Complete Purchase
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

