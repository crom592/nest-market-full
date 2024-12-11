'use client'

import { useState } from 'react'
import { Heart, Share2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function OngoingPurchasesPage() {
  const [filter, setFilter] = useState('popular')

  return (
    <div className="min-h-screen bg-purple-50 pb-16">
      <header className="bg-gradient-to-r from-purple-600 to-red-500 text-white p-4 flex items-center">
        <Link href="/" className="mr-4">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold">진행중인 공구</h1>
      </header>

      <main className="p-4">
        <div className="mb-4 flex justify-between">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="popular">인기순</option>
            <option value="time">남은 시간순</option>
            <option value="participants">참여 인원순</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="flex">
                <Image
                  src={`/placeholder.svg?height=100&width=100&text=Product ${index + 1}`}
                  alt={`Product ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">공구 상품 {index + 1}</h3>
                  <p className="text-sm text-gray-500">가격: ₩{(index + 1) * 10000}</p>
                  <p className="text-sm">참여: {index + 5}명</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{width: `${(index + 1) * 10}%`}}></div>
                  </div>
                  <p className="text-xs text-right mt-1">남은 시간: {23 - index}시간</p>
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-2">
                <button className="text-red-500"><Heart size={20} /></button>
                <button className="text-blue-500"><Share2 size={20} /></button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

