import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const gender = searchParams.get("gender")

  const where = gender
    ? {
        OR: [
          { gender: gender.toUpperCase() },
          { gender: "UNISEX" },
        ],
      }
    : undefined

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json({ products })
}

