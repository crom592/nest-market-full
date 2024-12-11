// app/auth/signin/page.tsx
'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <button
              onClick={() => signIn('kakao', { callbackUrl: '/' })}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-300 hover:bg-yellow-400"
            >
              카카오톡으로 로그인
            </button>
            <button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600"
            >
              구글로 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}