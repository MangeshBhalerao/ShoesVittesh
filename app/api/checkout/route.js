import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"

const CART_COOKIE = "cartId"

export async function POST() {
  try {
    const cookieStore = await cookies()
    const cartId = cookieStore.get(CART_COOKIE)?.value

    if (!cartId) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    const cart = await prisma.cart.findUnique({
      where: { cartId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    const total = cart.items.reduce((sum, item) => {
      return sum + Number(item.product.price) * item.quantity
    }, 0)

    const order = await prisma.order.create({
      data: {
        orderNumber: `SNP-${Date.now()}`,
        total,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: {
        items: true,
      },
    })

    // Clear cart after successful checkout
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    })

    return NextResponse.json({ order })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

