import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const appliesTo = searchParams.get('appliesTo')

  const where: Record<string, unknown> = {
    userId: session.user.id
  }

  if (appliesTo) {
    where.appliesTo = appliesTo
  }

  const customFields = await prisma.customField.findMany({
    where,
    orderBy: {
      fieldName: 'asc'
    }
  })

  return NextResponse.json(customFields)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  
  const customField = await prisma.customField.create({
    data: {
      ...body,
      userId: session.user.id
    }
  })

  return NextResponse.json(customField)
}
