// components/ProfileButton.tsx
'use client'

import { useSession, signIn } from 'next-auth/react'
import { User } from 'lucide-react'

export default function ProfileButton() {
  const { data: session } = useSession()

  const handleClick = () => {
    if (!session) {
      signIn(undefined, { callbackUrl: '/auth/signin' })
    } else {
      // 프로필 페이지로 이동
      window.location.href = '/profile'
    }
  }

  return (
    <button
      onClick={handleClick}
      className="relative"
    >
      {session?.user?.image ? (
        <Image
          src={session.user.image}
          alt="Profile"
          width={24}
          height={24}
          className="rounded-full"
        />
      ) : (
        <User size={24} />
      )}
    </button>
  )
}