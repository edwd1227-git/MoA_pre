'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import type { ViewingRecord } from './data'
import { SAMPLE_RECORDS } from './data'

export type Screen = 'splash' | 'onboarding' | 'onboarding-internal' | 'home' | 'explore' | 'calendar' | 'mypage' | 'detail' | 'seatView' | 'settings'

type AppState = {
  screen: Screen
  selectedPerformanceId: string | null
  onboardingComplete: boolean
  selectedGenres: string[]
  selectedMoods: string[]
  selectedCast: string[]
  selectedExperience: string[]
  userTags: string[]
  viewingRecords: ViewingRecord[]
  setScreen: (screen: Screen, performanceId?: string | null) => void
  completeOnboarding: (tags: string[]) => void
  addRecord: (record: Omit<ViewingRecord, 'id'>) => void
  updateRecord: (id: string, record: Partial<ViewingRecord>) => void
  deleteRecord: (id: string) => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreenState] = useState<Screen>('splash')
  const [selectedPerformanceId, setSelectedPerformanceId] = useState<string | null>(null)
  const [onboardingComplete, setOnboardingComplete] = useState(false)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedMoods, setSelectedMoods] = useState<string[]>([])
  const [selectedCast, setSelectedCast] = useState<string[]>([])
  const [selectedExperience, setSelectedExperience] = useState<string[]>([])
  const [userTags, setUserTags] = useState<string[]>([])
  const [viewingRecords, setViewingRecords] = useState<ViewingRecord[]>(SAMPLE_RECORDS)

  const setScreen = useCallback((newScreen: Screen, performanceId?: string | null) => {
    setScreenState(newScreen)
    if (performanceId !== undefined) {
      setSelectedPerformanceId(performanceId)
    }
  }, [])

  const completeOnboarding = useCallback((tags: string[]) => {
    setUserTags(tags)
    setOnboardingComplete(true)
    setScreen('home')
  }, [setScreen])

  const addRecord = useCallback((record: Omit<ViewingRecord, 'id'>) => {
    const newRecord: ViewingRecord = {
      ...record,
      id: `r${Date.now()}`,
    }
    setViewingRecords((prev) => [newRecord, ...prev])
  }, [])

  const updateRecord = useCallback((id: string, update: Partial<ViewingRecord>) => {
    setViewingRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...update } : r))
    )
  }, [])

  const deleteRecord = useCallback((id: string) => {
    setViewingRecords((prev) => prev.filter((r) => r.id !== id))
  }, [])

  return (
    <AppContext.Provider
      value={{
        screen,
        selectedPerformanceId,
        onboardingComplete,
        selectedGenres,
        selectedMoods,
        selectedCast,
        selectedExperience,
        userTags,
        viewingRecords,
        setScreen,
        completeOnboarding,
        addRecord,
        updateRecord,
        deleteRecord,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
