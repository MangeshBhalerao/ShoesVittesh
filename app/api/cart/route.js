import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { randomUUID } from "crypto"

export const dynamic = "force-dynamic"

const CART_COOKIE = "cartId"

async function getOrCreateCart() {
  const cookieStore = cookies()
  let cartId = cookieStore.get(CART_COOKIE)?.value

  if (!cartId) {
    cartId = randomUUID()
    cookieStore.set(CART_COOKIE, cartId, {
      httpOnly: true,
      path: "/",
    })
  }

  let cart = await prisma.cart.findUnique({
    where: { cartId },
  })

  if (!cart) {
    cart = await prisma.cart.create({ data: { cartId } })
  }

  return { cart }
}

export async function GET() {
  const cookieStore = cookies()
  const cartId = cookieStore.get(CART_COOKIE)?.value

  if (!cartId) {
    return NextResponse.json({ items: [] })
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

  if (!cart) {
    return NextResponse.json({ items: [] })
  }

  return NextResponse.json({ items: cart.items })
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { productId, quantity = 1 } = body || {}

    if (!productId) {
      return NextResponse.json({ error: "productId is required" }, { status: 400 })
    }

    const { cart } = await getOrCreateCart()

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    })

    let item

    if (existingItem) {
      item = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      })
    } else {
      item = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      })
    }

    return NextResponse.json({ item })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const itemId = searchParams.get("itemId")

    if (!itemId) {
      return NextResponse.json({ error: "itemId query param is required" }, { status: 400 })
    }

    await prisma.cartItem.delete({
      where: { id: Number(itemId) },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

