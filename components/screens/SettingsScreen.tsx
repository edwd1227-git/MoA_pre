'use client'

import { useApp } from '@/lib/store'
import { useState } from 'react'
import { ChevronRight, Bell, RotateCcw, Info } from 'lucide-react'

export function SettingsScreen() {
  const { setScreen, completeOnboarding } = useApp()
  const [notificationSettings, setNotificationSettings] = useState({
    performance: true,
    booking: true,
    review: true,
  })

  const handleResetPreferences = () => {
    setScreen('onboarding')
  }

  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="page-fade-in pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/95 px-4 py-4 backdrop-blur">
        <button
          onClick={() => setScreen('mypage')}
          className="mb-3 inline-block rounded px-2 py-1 text-muted-foreground hover:text-foreground"
        >
          ← 돌아가기
        </button>
        <h1 className="font-serif text-2xl font-bold text-foreground">설정</h1>
      </div>

      <div className="space-y-2 py-4">
        {/* Reset Preferences */}
        <div className="border-b border-border">
          <button
            onClick={handleResetPreferences}
            className="flex w-full items-center justify-between px-4 py-4 hover:bg-card transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <RotateCcw size={20} className="text-accent" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground">취향 다시 설정하기</h3>
                <p className="text-xs text-muted-foreground">선호도를 다시 선택해보세요</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Notification Settings */}
        <div className="border-b border-border">
          <div className="px-4 py-4">
            <h3 className="mb-4 flex items-center gap-3 font-semibold text-foreground">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Bell size={20} className="text-accent" />
              </div>
              알림 설정
            </h3>
            
            <div className="space-y-3 ml-2">
              {/* Performance Notification */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-foreground">공연 알림</p>
                  <p className="text-xs text-muted-foreground">새로운 공연 소식을 받아보세요</p>
                </div>
                <button
                  onClick={() => toggleNotification('performance')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                    notificationSettings.performance ? 'bg-accent' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-background transition ${
                      notificationSettings.performance ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Booking Notification */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-foreground">예매 오픈 알림</p>
                  <p className="text-xs text-muted-foreground">예매 시작 시간을 알려드립니다</p>
                </div>
                <button
                  onClick={() => toggleNotification('booking')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                    notificationSettings.booking ? 'bg-accent' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-background transition ${
                      notificationSettings.booking ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Review Notification */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-foreground">관람 후기 알림</p>
                  <p className="text-xs text-muted-foreground">다른 관람객의 평가를 알려드립니다</p>
                </div>
                <button
                  onClick={() => toggleNotification('review')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                    notificationSettings.review ? 'bg-accent' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-background transition ${
                      notificationSettings.review ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="border-b border-border px-4 py-4">
          <h3 className="mb-4 flex items-center gap-3 font-semibold text-foreground">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Info size={20} className="text-accent" />
            </div>
            앱 정보
          </h3>

          <div className="ml-2 space-y-4">
            <div className="flex items-center justify-between py-2">
              <p className="text-foreground">앱 이름</p>
              <p className="text-muted-foreground font-medium">MoA - Moments of Arts</p>
            </div>
            <div className="flex items-center justify-between py-2">
              <p className="text-foreground">앱 버전</p>
              <p className="text-muted-foreground">1.0.0</p>
            </div>
            <div className="flex items-center justify-between py-2">
              <p className="text-foreground">개발사</p>
              <p className="text-muted-foreground">MoA Team</p>
            </div>
            <div className="pt-4 border-t border-border">
              <button className="text-sm text-accent hover:underline">
                서비스 이용약관 보기
              </button>
            </div>
            <div>
              <button className="text-sm text-accent hover:underline">
                개인정보 처리방침 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
