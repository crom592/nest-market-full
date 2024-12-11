'use client'

import { useState, useEffect } from 'react'
import { Search, ShoppingBag, User, Home, ArrowUp, Heart, Share2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { categories } from './data/categories'

async function fetchOngoingPurchases() {
  const response = await fetch('/api/ongoing-purchases')
  return response.json()
}

async function fetchPopularProducts() {
  const response = await fetch('/api/popular-products')
  return response.json()
}

export default function HomePage() {
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [ongoingPurchases, setOngoingPurchases] = useState([])
  const [popularProducts, setPopularProducts] = useState([])

  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Fetch ongoing purchases
    fetchOngoingPurchases().then(setOngoingPurchases)
    fetchPopularProducts().then(setPopularProducts)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-green-600 text-white p-4 flex items-center">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="mr-4"
        />
        <h1 className="font-sans text-2xl font-bold mr-6">둥지마켓</h1>
        <form onSubmit={handleSearch} className="flex-grow flex items-center">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="검색하기"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pr-10 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600"
            >
              <Search size={20} />
            </button>
          </div>
        </form>
      </header>

      <main className="p-4">
        <div className="mb-4">
          <Image
            src="/images/banner.png"
            alt="Banner"
            width={400}
            height={150}
            className="w-full h-40 object-cover object-top rounded-lg"
          />
        </div>

         {/* Categories */}
         <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">카테고리</h2>
          <div className="grid grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="flex flex-col items-center justify-center p-2 bg-white rounded-lg shadow-sm"
              >
                <span className="text-2xl mb-1">{category.icon}</span>
                <span className="text-xs text-center">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 진행중인 공구 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">진행중인 공구</h2>
          <div className="grid grid-cols-2 gap-4">
            {ongoingPurchases.map((purchase) => (
              <div key={purchase.id} className="bg-white p-2 rounded-lg shadow">
                <Image
                  src={purchase.imageUrl || '/placeholder.svg'}
                  alt={purchase.title}
                  width={100}
                  height={100}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <p className="text-sm font-semibold">{purchase.title}</p>
                <p className="text-xs text-gray-500">가격: ₩{purchase.targetPrice}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs">참여: {purchase.participants.length}명</span>
                  <div className="flex space-x-2">
                    <button className="text-red-500"><Heart size={16} /></button>
                    <button className="text-blue-500"><Share2 size={16} /></button>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{width: `${Math.min(purchase.participants.length / purchase.minParticipants * 100, 100)}%`}}></div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/ongoing-purchases" className="text-green-600 text-sm mt-2 block">더 보기</Link>
        </div>

        {/* 인기 상품 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">인기상품</h2>
          <div className="grid grid-cols-2 gap-4">
            {popularProducts.map((product) => (
              <div key={product.id} className="bg-white p-2 rounded-lg shadow">
                <Image
                  src={product.imageUrl || '/placeholder.svg'}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <p className="text-sm font-semibold">{product.title}</p>
                <p className="text-xs text-gray-500">가격: ₩{product.targetPrice}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around p-2">
          <Link href="/" className="flex flex-col items-center text-green-600">
            <Home size={24} />
            <span className="text-xs">홈</span>
          </Link>
          <Link href="/search" className="flex flex-col items-center text-gray-600">
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

      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 bg-yellow-500 text-white p-2 rounded-full shadow-lg"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  )
}