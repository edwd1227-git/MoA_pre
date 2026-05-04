'use client'

import { useApp } from '@/lib/store'
import { PERFORMANCES, BEGINNER_PICKS, TRENDING } from '@/lib/data'
import PerformanceCard from '../PerformanceCard'

function getYoutubeThumbnail(url: string) {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&?/]+)/
  )
  return match?.[1]
    ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
    : '/images/Moa_logo.png'
}

export default function HomeScreen() {
  const { userTags, setScreen } = useApp()

  const recommended = [...PERFORMANCES]
    .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
    .slice(0, 4)
  const monthlyRecommendedVideos = PERFORMANCES.filter((performance) =>
    performance.youtubeUrl.trim()
  )

  const displayTags = userTags.slice(0, 4)

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center justify-between">
       <img 
        src="/images/Moa_logo.png" 
        alt="MOA 로고" 
        className="w-16 h-16 object-contain"
       />
        <p className="text-muted-foreground text-sm">안녕하세요 👋</p>
      </div>

      {/* Greeting section */}
      <div className="px-5 pb-6">
        <h2 className="title-section text-foreground mb-3 text-balance">
          오늘도 공연의 세계로
        </h2>
        {displayTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {displayTags.map((tag) => (
              <span
                key={tag}
                className="text-badge px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(212,175,55,0.15)', color: '#D4AF37' }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {monthlyRecommendedVideos.length > 0 && (
        <section className="mb-8 px-5">
          <div className="mb-4">
            <h2 className="title-card text-foreground">이번 달 추천 작품</h2>
            <p className="text-badge text-muted-foreground mt-0.5">
              공연 소개 영상을 먼저 보고 선택해보세요
            </p>
          </div>

          <div className="space-y-3">
            {monthlyRecommendedVideos.map((performance) => (
              <div
                key={`youtube-${performance.id}`}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <img
                  src={getYoutubeThumbnail(performance.youtubeUrl)}
                  alt={`${performance.title} 유튜브 썸네일`}
                  className="h-40 w-full object-cover"
                />
                <div className="space-y-3 p-4">
                  <h3 className="text-base font-semibold text-foreground">
                    {performance.title}
                  </h3>
                  <button
                    onClick={() =>
                      window.open(performance.youtubeUrl, '_blank', 'noopener,noreferrer')
                    }
                    className="inline-flex rounded-lg border border-[#D4AF37]/40 px-3 py-2 text-sm font-medium text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/10"
                  >
                    영상 보러가기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 나를 위한 추천 */}
      <section className="mb-8">
        <div className="flex items-center justify-between px-5 mb-4">
          <div>
            <h2 className="title-card text-foreground">나를 위한 추천 공연</h2>
            <p className="text-badge text-muted-foreground mt-0.5">취향 분석 기반 맞춤 추천</p>
          </div>
          <button
          onClick={() => setScreen('explore')}
           className="text-badge text-primary font-medium">전체보기</button>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5 pb-2">
          {recommended.map((perf, i) => (
            <div
              key={perf.id}
              className={`fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)}`}
            >
              <PerformanceCard performance={perf} userTags={userTags} size="md" />
            </div>
          ))}
        </div>
      </section>

      {/* 입문자 필수 관람작 */}
      <section className="mb-8 px-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="title-card text-foreground">입문자 필수 관람작</h2>
            <p className="text-badge text-muted-foreground mt-0.5">처음이라면 꼭 봐야 할 공연</p>
          </div>
          <button 
          onClick={() => setScreen('explore')}
          className="text-badge text-primary font-medium">전체보기</button>
        </div>
        <div className="flex flex-col gap-3">
          {BEGINNER_PICKS.map((perf) => (
            <PerformanceCard key={perf.id} performance={perf} userTags={userTags} size="lg" />
          ))}
        </div>
      </section>

      {/* 이번 달 화제작 */}
      <section className="px-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="title-card text-foreground">이번 달 화제작</h2>
            <p className="text-badge text-muted-foreground mt-0.5">지금 가장 인기 있는 공연</p>
          </div>
          <button
          onClick={() => setScreen('explore')}
          className="text-badge text-primary font-medium">전체보기</button>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {TRENDING.map((perf, i) => (
            <div
              key={perf.id}
              className={`fade-in-up fade-in-up-delay-${Math.min(i + 1, 4)}`}
            >
              <PerformanceCard performance={perf} userTags={userTags} size="md" />
            </div>
          ))}
        </div>
      </section>

      {/* Spotlight banner */}
      <div className="mx-5 mt-8 rounded-2xl overflow-hidden"
        style={{ background: '#1A1A1A', border: '1px solid rgba(212,175,55,0.2)' }}>
        <div className="p-5">
          <p className="text-badge text-accent font-bold tracking-widest uppercase mb-2">SPOTLIGHT</p>
          <p className="title-card text-foreground mb-1">공연 입문 가이드</p>
          <p className="text-body text-muted-foreground leading-relaxed mb-4">
            처음 공연장에 가기 전,
            <br />꼭 알아야 할 기본 에티켓과 팁
          </p>
          <button
            onClick={() => setScreen('guide')}
            className="text-badge text-accent font-medium flex items-center gap-1"
          >
            읽어보기
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7H11M11 7L8 4M11 7L8 10" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
