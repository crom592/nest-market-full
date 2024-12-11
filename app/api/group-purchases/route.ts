// pages/api/group-purchases/index.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { ProductCategory, PurchaseStatus } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const {
        category,
        sortBy = 'createdAt',
        status = 'RECRUITING',
        page = '1',
        limit = '10'
      } = req.query

      const skip = (parseInt(page as string) - 1) * parseInt(limit as string)
      
      const where = {
        ...(category ? { category: category as ProductCategory } : {}),
        ...(status ? { status: status as PurchaseStatus } : {}),
      }

      const orderBy = (() => {
        switch (sortBy) {
          case 'popularity':
            return { popularity: 'desc' }
          case 'remainingTime':
            return { endTime: 'asc' }
          case 'participantCount':
            return { currentParticipants: 'desc' }
          default:
            return { createdAt: 'desc' }
        }
      })()

      const [items, total] = await Promise.all([
        prisma.groupPurchase.findMany({
          where,
          orderBy,
          skip,
          take: parseInt(limit as string),
          include: {
            _count: {
              select: {
                participants: true,
                likes: true
              }
            },
            creator: {
              select: {
                nickname: true,
                level: true
              }
            }
          }
        }),
        prisma.groupPurchase.count({ where })
      ])

      return res.status(200).json({
        items,
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(total / parseInt(limit as string))
      })
    } catch (error) {
      console.error('Error fetching group purchases:', error)
      return res.status(500).json({ error: 'Failed to fetch group purchases' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
