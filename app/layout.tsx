import type { Metadata, Viewport } from 'next'
import { Gowun_Batang } from 'next/font/google'
import './globals.css'

const gowunBatang = Gowun_Batang({
  subsets: ['latin', 'korean'],
  weight: '700',
  variable: '--font-gowun-batang',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '공연 입문 가이드',
  description: '뮤지컬과 연극을 처음 시작하는 분들을 위한 공연 가이드',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0A0A0A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${gowunBatang.variable} bg-background`}>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" />
      </head>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
