import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // In a real app this is where you'd store the email
    // in a database or send it to an email marketing provider.

    return NextResponse.json({ success: true, message: "Subscribed successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

