import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const popularProducts = await prisma.groupPurchase.findMany({
      orderBy: { popularity: 'desc' },
      take: 10,
    })
    return NextResponse.json(popularProducts)
  } catch (error) {
    console.error('Error fetching popular products:', error)
    return NextResponse.json({ error: 'Failed to fetch popular products' }, { status: 500 })
  }
}
