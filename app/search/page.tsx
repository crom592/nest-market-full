'use client'

import { useState } from 'react'
import { Search, ArrowLeft, Filter, Home, ShoppingBag, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // 여기에 실제 검색 로직을 구현합니다.
    // 임시로 더미 데이터를 사용합니다.
    const dummyResults = [
      { id: 1, name: '검색 결과 1', price: 10000, participants: 5 },
      { id: 2, name: '검색 결과 2', price: 15000, participants: 3 },
      { id: 3, name: '검색 결과 3', price: 20000, participants: 7 },
      { id: 4, name: '검색 결과 4', price: 25000, participants: 2 },
    ]
    setSearchResults(dummyResults)
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-green-600 text-white p-4">
        <div className="flex items-center mb-4">
          <Link href="/" className="mr-4">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold">검색</h1>
        </div>
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="검색하기"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
          />
          <button
            type="submit"
            className="bg-white text-green-600 p-2 rounded-r-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Search size={20} />
          </button>
        </form>
      </header>

      <main className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">검색 결과</h2>
          <button className="flex items-center text-green-600">
            <Filter size={20} className="mr-1" />
            필터
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {searchResults.map((result) => (
            <div key={result.id} className="bg-white p-2 rounded-lg shadow">
              <Image
                src={`/placeholder.svg?height=100&width=100&text=Product ${result.id}`}
                alt={result.name}
                width={100}
                height={100}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <p className="text-sm font-semibold">{result.name}</p>
              <p className="text-xs text-gray-500">가격: ₩{result.price}</p>
              <p className="text-xs text-gray-500">참여: {result.participants}명</p>
            </div>
          ))}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around p-2">
          <Link href="/" className="flex flex-col items-center text-gray-600">
            <Home size={24} />
            <span className="text-xs">홈</span>
          </Link>
          <Link href="/search" className="flex flex-col items-center text-green-600">
            <Search size={24} />
            <span className="text-xs">검색</span>
          </Link>
          <Link href="/create-purchase" className="flex flex-col items-center text-gray-600">
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

