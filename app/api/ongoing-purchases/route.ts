import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const ongoingPurchases = await prisma.groupPurchase.findMany({
      where: { status: 'RECRUITING' },
      include: { participants: true },
    })
    return NextResponse.json(ongoingPurchases)
  } catch (error) {
    console.error('Error fetching ongoing purchases:', error)
    return NextResponse.json({ error: 'Failed to fetch ongoing purchases' }, { status: 500 })
  }
}
