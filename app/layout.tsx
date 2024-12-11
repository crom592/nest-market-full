import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '둥지마켓',
  description: '함께 구매하고 절약하세요',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link 
            href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-round.css" 
            rel="stylesheet"
          />
      </head>
      <body className={inter.className}><Providers>{children}</Providers></body>
    </html>
  )
}

