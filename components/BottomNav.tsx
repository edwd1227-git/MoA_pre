'use client'

import { useApp } from '@/lib/store'
import type { Screen } from '@/lib/store'

type NavItem = {
  screen: Screen
  label: string
  icon: (active: boolean) => React.ReactNode
}

const NAV_ITEMS: NavItem[] = [
  {
    screen: 'home',
    label: '홈',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M3 10.5L11 3L19 10.5V19H14.5V14H7.5V19H3V10.5Z"
          fill={active ? '#D4AF37' : 'none'}
          stroke={active ? '#D4AF37' : '#888'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    screen: 'explore',
    label: '탐색',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle
          cx="10" cy="10" r="7"
          fill={active ? 'rgba(212,175,55,0.15)' : 'none'}
          stroke={active ? '#D4AF37' : '#888'}
          strokeWidth="1.5"
        />
        <path d="M17 17L20 20" stroke={active ? '#D4AF37' : '#888'} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    screen: 'calendar',
    label: '기록',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect
          x="3" y="4" width="16" height="16" rx="3"
          fill={active ? 'rgba(212,175,55,0.15)' : 'none'}
          stroke={active ? '#D4AF37' : '#888'}
          strokeWidth="1.5"
        />
        <path d="M7 2V5M15 2V5" stroke={active ? '#D4AF37' : '#888'} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3 9H19" stroke={active ? '#D4AF37' : '#888'} strokeWidth="1.5"/>
        <circle cx="8" cy="14" r="1.5" fill={active ? '#D4AF37' : '#888'}/>
        <circle cx="14" cy="14" r="1.5" fill={active ? '#D4AF37' : '#888'}/>
      </svg>
    ),
  },
  {
    screen: 'mypage',
    label: '마이',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle
          cx="11" cy="8" r="4"
          fill={active ? 'rgba(212,175,55,0.15)' : 'none'}
          stroke={active ? '#D4AF37' : '#888'}
          strokeWidth="1.5"
        />
        <path
          d="M3 19C3 15.686 6.686 13 11 13C15.314 13 19 15.686 19 19"
          stroke={active ? '#D4AF37' : '#888'}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]

export default function BottomNav() {
  const { screen, setScreen } = useApp()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border">
      <div className="flex items-center justify-around px-2 pb-safe-bottom">
        {NAV_ITEMS.map((item) => {
          const isActive = screen === item.screen
          return (
            <button
              key={item.screen}
              onClick={() => setScreen(item.screen)}
              className="flex flex-col items-center gap-1 py-3 px-4 min-w-0 transition-all active:scale-95"
            >
              {item.icon(isActive)}
              <span
                className="text-xs font-medium"
                style={{ color: isActive ? '#D4AF37' : '#888' }}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
