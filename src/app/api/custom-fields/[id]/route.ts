import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await context.params
  
  const customField = await prisma.customField.deleteMany({
    where: {
      id,
      userId: session.user.id
    }
  })

  if (customField.count === 0) {
    return NextResponse.json({ error: "Custom field not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
