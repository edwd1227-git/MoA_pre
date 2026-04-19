'use client'

import { AppProvider, useApp } from '@/lib/store'
import { SplashScreen } from '@/components/screens/SplashScreen'
import OnboardingScreen from '@/components/screens/OnboardingScreen'
import HomeScreen from '@/components/screens/HomeScreen'
import ExploreScreen from '@/components/screens/ExploreScreen'
import CalendarScreen from '@/components/screens/CalendarScreen'
import MyPageScreen from '@/components/screens/MyPageScreen'
import { DetailScreen } from '@/components/screens/DetailScreen'
import { SeatViewScreen } from '@/components/screens/SeatViewScreen'
import { SettingsScreen } from '@/components/screens/SettingsScreen'
import BottomNav from '@/components/BottomNav'

function AppContent() {
  const { screen, onboardingComplete } = useApp()

  // Show splash screen
  if (screen === 'splash') {
    return (
      <div className="max-w-[430px] mx-auto min-h-screen bg-background relative">
        <SplashScreen />
      </div>
    )
  }

  // Show onboarding if not complete
  if (!onboardingComplete) {
    return (
      <div className="max-w-[430px] mx-auto min-h-screen bg-background relative">
        <OnboardingScreen />
      </div>
    )
  }

  const renderScreen = () => {
    switch (screen) {
      case 'detail':
        return <DetailScreen />
      case 'seatView':
        return <SeatViewScreen />
      case 'settings':
        return <SettingsScreen />
      case 'explore':
        return <ExploreScreen />
      case 'calendar':
        return <CalendarScreen />
      case 'mypage':
        return <MyPageScreen />
      case 'home':
      default:
        return <HomeScreen />
    }
  }

  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-background relative">
      <main className="page-fade-in">
        {renderScreen()}
      </main>
      {!['detail', 'seatView', 'settings'].includes(screen) && <BottomNav />}
    </div>
  )
}

export default function Page() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

