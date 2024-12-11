// app/profile/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">프로필</h1>
      {session?.user && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-4">
            {session.user.image && (
              <Image
                src={session.user.image}
                alt="Profile"
                width={64}
                height={64}
                className="rounded-full"
              />
            )}
            <div>
              <h2 className="text-xl font-semibold">{session.user.name}</h2>
              <p className="text-gray-500">{session.user.email}</p>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">참여중인 공구</h3>
              {/* 참여중인 공구 목록 */}
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">찜한 상품</h3>
              {/* 찜한 상품 목록 */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}