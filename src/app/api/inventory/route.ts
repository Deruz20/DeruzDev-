import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const inventory = await prisma.inventoryItem.findMany({
    where: {
      userId: session.user.id
    },
    orderBy: {
      name: 'asc'
    }
  })

  return NextResponse.json(inventory)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  
  const item = await prisma.inventoryItem.create({
    data: {
      ...body,
      userId: session.user.id
    }
  })

  return NextResponse.json(item)
}
