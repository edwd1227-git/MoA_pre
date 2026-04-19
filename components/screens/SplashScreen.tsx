'use client'

import { useEffect } from 'react'
import { useApp } from '@/lib/store'

export function SplashScreen() {
  const { setScreen } = useApp()

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('onboarding-internal')
    }, 2000)

    return () => clearTimeout(timer)
  }, [setScreen])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative" style={{ background: '#0A0A0A' }}>
      {/* Stage spotlight layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom, rgba(212,175,55,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 fade-in text-center space-y-4">
        {/* MoA Logo */}
        <img 
         src="/images/Moa_logo.png" 
         alt="MOA 로고" 
         className="w-48 h-48 object-contain mb-6"
/>

        {/* Subtitle */}
        <p className="text-body text-muted-foreground tracking-widest">
          Moments of Arts
        </p>

        {/* Tagline */}
        <p className="text-body text-foreground mt-8">
          공연의 모든 순간을 담다
        </p>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <div className="flex gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: '#D4AF37', animation: 'pulse 1.5s infinite' }}
          />
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: '#D4AF37', animation: 'pulse 1.5s infinite 0.3s' }}
          />
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: '#D4AF37', animation: 'pulse 1.5s infinite 0.6s' }}
          />
        </div>
      </div>
    </div>
  )
}
