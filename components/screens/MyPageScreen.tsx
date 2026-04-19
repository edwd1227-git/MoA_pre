'use client'

import { useApp } from '@/lib/store'

function StatCard({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex-1 bg-secondary rounded-2xl p-4 text-center border border-border">
      <p className="title-card text-primary mb-1">{value}</p>
      <p className="text-badge text-muted-foreground">{label}</p>
    </div>
  )
}

export default function MyPageScreen() {
  const { userTags, viewingRecords, setScreen } = useApp()

  const totalWatched = viewingRecords.length
  const avgRating =
    viewingRecords.length > 0
      ? (viewingRecords.reduce((a, r) => a + r.rating, 0) / viewingRecords.length).toFixed(1)
      : '—'

  // Find most-watched genre
  const genreMap: Record<string, number> = {}
  userTags.forEach((t) => {
    if (t.startsWith('#역사') || t === '#역사극') genreMap['역사극'] = (genreMap['역사극'] || 0) + 1
    if (t.includes('로맨스')) genreMap['로맨스'] = (genreMap['로맨스'] || 0) + 1
    if (t.includes('코미디')) genreMap['코미디'] = (genreMap['코미디'] || 0) + 1
  })
  const favoriteGenre =
    Object.entries(genreMap).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '설정 중'

  const recentRecords = viewingRecords.slice(0, 3)

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center justify-between">
      <img 
       src="/images/Moa_logo.png" 
       alt="MOA 로고" 
       className="w-16 h-16 object-contain"
       />
        <p className="text-badge text-foreground font-medium">마이페이지</p>
      </div>

      {/* Profile */}
      <div className="mx-5 mb-6 bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
            style={{ background: '#1A1A1A', border: '2px solid rgba(212,175,55,0.4)' }}
          >
            🎭
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="title-card text-foreground">공연 애호가</p>
              <span className="text-badge font-medium px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(212,175,55,0.15)', color: '#D4AF37' }}>
                MoA Member
              </span>
            </div>
            <p className="text-body text-muted-foreground">공연 입문자</p>
          </div>
        </div>

        {/* Tags */}
        {userTags.length > 0 && (
          <div>
            <p className="text-badge text-muted-foreground mb-2">나의 취향 태그</p>
            <div className="flex flex-wrap gap-2">
              {userTags.map((tag) => (
            <span
              key={tag}
              className="text-badge font-medium px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(212,175,55,0.15)', color: '#D4AF37' }}
            >
              {tag}
            </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="px-5 mb-6">
        <p className="text-body text-foreground font-medium mb-3">관람 통계</p>
        <div className="flex gap-3">
          <StatCard value={totalWatched} label="총 관람 횟수" />
          <StatCard value={avgRating} label="평균 별점" />
          <StatCard value={favoriteGenre} label="선호 장르" />
        </div>
      </div>

      {/* Recent records */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-body text-foreground font-medium">최근 관람 기록</p>
          <button
            onClick={() => setScreen('calendar')}
            className="text-badge text-primary font-medium"
          >
            전체보기
          </button>
        </div>

        {recentRecords.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border p-6 text-center">
            <p className="text-body text-muted-foreground">아직 관람 기록이 없어요</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {recentRecords.map((record) => (
              <div key={record.id} className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg flex-shrink-0">
                  🎭
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">{record.performanceTitle}</p>
                  <p className="text-muted-foreground text-xs">
                    {new Date(record.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="flex gap-0.5 flex-shrink-0">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M6 1L7.35 4.36L11 4.86L8.5 7.28L9.09 11L6 9.27L2.91 11L3.5 7.28L1 4.86L4.65 4.36L6 1Z"
                        fill={s <= record.rating ? '#D4AF37' : 'none'}
                        stroke={s <= record.rating ? '#D4AF37' : '#2A2A2A'}
                        strokeWidth="1"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="px-5">
        <p className="text-foreground font-medium mb-3">설정</p>
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {[
            { label: '취향 다시 설정하기', icon: '✨', action: () => setScreen('settings') },
            { label: '알림 설정', icon: '🔔', action: () => setScreen('settings') },
            { label: '앱 정보', icon: 'ℹ️', action: () => setScreen('settings') },
          ].map((item, i, arr) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`w-full flex items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-secondary ${i < arr.length - 1 ? 'border-b border-border' : ''}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-foreground text-sm">{item.label}</span>
              <svg className="ml-auto text-muted-foreground" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
