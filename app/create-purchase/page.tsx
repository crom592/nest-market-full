'use client'

import { useState } from 'react'
import { ArrowLeft, Search, ShoppingBag, User, Home } from 'lucide-react'
import Link from 'next/link'

export default function CreatePurchasePage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    minParticipants: '',
    maxParticipants: '',
    endDate: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 여기에 공구 등록 로직을 구현합니다.
    console.log('공구 등록:', formData)
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-green-600 text-white p-4">
        <div className="flex items-center mb-4">
          <Link href="/" className="mr-4">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold">공구 등록하기</h1>
        </div>
      </header>

      <main className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">상품명</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">상품 설명</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">가격</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="minParticipants" className="block text-sm font-medium text-gray-700">최소 참여자</label>
              <input
                type="number"
                id="minParticipants"
                name="minParticipants"
                value={formData.minParticipants}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700">최대 참여자</label>
              <input
                type="number"
                id="maxParticipants"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">마감일</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              공구 등록하기
            </button>
          </div>
        </form>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around p-2">
          <Link href="/" className="flex flex-col items-center text-gray-600">
            <Home size={24} />
            <span className="text-xs">홈</span>
          </Link>
          <Link href="/search" className="flex flex-col items-center text-gray-600">
            <Search size={24} />
            <span className="text-xs">검색</span>
          </Link>
          <Link href="/create-purchase" className="flex flex-col items-center text-green-600">
            <ShoppingBag size={24} />
            <span className="text-xs">공구등록</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center text-gray-600">
            <User size={24} />
            <span className="text-xs">프로필</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

