'use client'

import { useState } from 'react'
import { useApp } from '@/lib/store'
import {
  GENRE_OPTIONS,
  MOOD_OPTIONS,
  CAST_OPTIONS,
  EXPERIENCE_OPTIONS,
} from '@/lib/data'

const STEPS = [
  {
    step: 1,
    title: '어떤 장르를 좋아하세요?',
    subtitle: '관심 있는 장르를 모두 선택해주세요',
    options: GENRE_OPTIONS,
    multi: true,
  },
  {
    step: 2,
    title: '어떤 분위기를 선호하세요?',
    subtitle: '원하는 느낌을 골라보세요',
    options: MOOD_OPTIONS,
    multi: true,
  },
  {
    step: 3,
    title: '배우 선호도는 어떤가요?',
    subtitle: '하나만 선택해주세요',
    options: CAST_OPTIONS,
    multi: false,
  },
  {
    step: 4,
    title: '공연 관람 경험이 있으신가요?',
    subtitle: '솔직하게 선택해주세요',
    options: EXPERIENCE_OPTIONS,
    multi: false,
  },
]

export default function OnboardingScreen() {
  const { completeOnboarding } = useApp()
  const [currentStep, setCurrentStep] = useState(0)
  const [selections, setSelections] = useState<Record<number, string[]>>({})
  const [showWelcome, setShowWelcome] = useState(true)

  const step = STEPS[currentStep]
  const currentSelections = selections[currentStep] ?? []

  function toggleSelection(tag: string) {
    setSelections((prev) => {
      const current = prev[currentStep] ?? []
      if (step.multi) {
        if (current.includes(tag)) {
          return { ...prev, [currentStep]: current.filter((t) => t !== tag) }
        } else {
          return { ...prev, [currentStep]: [...current, tag] }
        }
      } else {
        return { ...prev, [currentStep]: [tag] }
      }
    })
  }

  function handleNext() {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1)
    } else {
      const allTags = Object.values(selections).flat()
      const uniqueTags = Array.from(new Set(allTags))
      completeOnboarding(uniqueTags)
    }
  }

  if (showWelcome) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden" style={{ background: '#0A0A0A' }}>
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

        {/* MoA header */}
        <img 
      src="/images/Moa_logo.png" 
      alt="MOA 로고" 
      className="absolute top-6 left-6 w-16 h-16 object-contain z-10"
      />    
        <div className="relative z-10 text-center max-w-sm fade-in">
        <img 
         src="/images/Moa_logo.png" 
         alt="MOA 로고" 
         className="w-48 h-48 object-contain mb-6 mx-auto"
        />
          <h1 className="title-main text-primary mb-3 leading-tight text-balance">
            공연의 세계로
            <br />오신 것을 환영합니다
          </h1>
          <p className="text-body text-muted-foreground mb-2">
            뮤지컬과 연극, 처음이라도
            <br />괜찮아요
          </p>
          <p className="text-badge text-muted-foreground mb-10">
            취향에 맞는 공연을 찾아드릴게요
          </p>
          <button
            onClick={() => setShowWelcome(false)}
            className="w-full py-4 bg-primary text-primary-foreground font-bold text-base rounded-xl gold-glow transition-all active:scale-95"
          >
            취향 설정 시작하기
          </button>
          <p className="text-muted-foreground text-xs mt-4">약 1분이면 완료돼요</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col relative" style={{ background: '#0A0A0A' }}>
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

      {/* Header with MoA */}
      <div className="sticky top-0 z-10 px-6 pt-6 pb-4 flex items-center justify-between" style={{ background: 'transparent' }}>
        <img 
        src="/images/Moa_logo.png" 
        alt="MOA 로고" 
        className="w-16 h-16 object-contain"
        />
        <p className="text-muted-foreground text-xs">
          {currentStep + 1} / {STEPS.length}
        </p>
      </div>

      {/* Progress bar */}
      <div className="sticky top-16 z-10 px-6 pb-4" style={{ background: 'transparent' }}>
        <div className="flex gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-1 rounded-full transition-all duration-500"
              style={{
                background: i <= currentStep ? '#D4AF37' : '#2A2A2A',
              }}
            />
          ))}
        </div>
        <p className="text-muted-foreground text-xs">
          {currentStep + 1} / {STEPS.length}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6">
        <div className="mb-8 fade-in-up">
          <h2 className="title-section text-foreground mb-2 text-balance">
            {step.title}
          </h2>
          <p className="text-badge text-muted-foreground">{step.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {step.options.map((option, i) => {
            const isSelected = currentSelections.includes(option.tag)
            return (
              <button
                key={option.id}
                onClick={() => toggleSelection(option.tag)}
                className={`
                  relative flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all duration-200
                  fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)}
                  ${isSelected
                    ? 'border-primary bg-primary/10 gold-glow-border'
                    : 'border-border bg-card hover:border-muted-foreground'
                  }
                `}
              >
                <span className="text-3xl">{option.icon}</span>
                <span
                  className={`text-badge font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}
                >
                  {option.label}
                </span>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="#0A0A0A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom button */}
      <div className="px-6 pb-10 pt-4">
        <button
          onClick={handleNext}
          disabled={currentSelections.length === 0}
          className="w-full py-4 font-bold text-base rounded-xl transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
          style={{
            background: currentSelections.length > 0 ? '#D4AF37' : '#2A2A2A',
            color: currentSelections.length > 0 ? '#0A0A0A' : '#888',
            boxShadow: currentSelections.length > 0 ? '0 0 20px rgba(212,175,55,0.2)' : 'none',
          }}
        >
          {currentStep < STEPS.length - 1 ? '다음' : '나의 취향 완성하기'}
        </button>
      </div>
    </div>
  )
}
