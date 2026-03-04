import { NextResponse } from "next/server"

const categories = [
  {
    id: 1,
    name: "Running",
    image: "/running-sneakers-athletic-shoes.jpg",
    count: 120,
  },
  {
    id: 2,
    name: "Basketball",
    image: "/basketball-sneakers-high-top-shoes.jpg",
    count: 85,
  },
  {
    id: 3,
    name: "Lifestyle",
    image: "/casual-lifestyle-sneakers-everyday-shoes.jpg",
    count: 200,
  },
  {
    id: 4,
    name: "Skateboarding",
    image: "/skateboarding-sneakers-skate-shoes.jpg",
    count: 60,
  },
]

export function GET() {
  return NextResponse.json({ categories })
}

