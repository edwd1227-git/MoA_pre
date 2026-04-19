'use client'

import { useState, useMemo } from 'react'
import { useApp } from '@/lib/store'
import { PERFORMANCES } from '@/lib/data'
import PerformanceCard from '../PerformanceCard'

const TYPE_FILTERS = ['전체', '뮤지컬', '연극', '오페라'] as const
type TypeFilter = (typeof TYPE_FILTERS)[number]

const HASHTAG_FILTERS = [
  '#역사극', '#로맨스', '#코미디', '#스릴러',
  '#판타지', '#웅장한', '#감동적인', '#스타캐스팅',
]

export default function ExploreScreen() {
  const { userTags } = useApp()
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('전체')
  const [activeHashtags, setActiveHashtags] = useState<string[]>([])
  const [isGrid, setIsGrid] = useState(false)

  function toggleHashtag(tag: string) {
    setActiveHashtags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const filtered = useMemo(() => {
    return PERFORMANCES.filter((p) => {
      const matchesQuery =
        query === '' ||
        p.title.includes(query) ||
        p.venue.includes(query) ||
        p.tags.some((t) => t.includes(query))
      const matchesType = typeFilter === '전체' || p.type === typeFilter
      const matchesHashtags =
        activeHashtags.length === 0 ||
        activeHashtags.every((ht) => p.tags.includes(ht))
      return matchesQuery && matchesType && matchesHashtags
    })
  }, [query, typeFilter, activeHashtags])

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm">
        <div className="px-5 pt-14 pb-3">
          <h1 className="title-section text-foreground mb-4">공연 탐색</h1>

          {/* Search */}
          <div className="relative">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              width="18" height="18" viewBox="0 0 18 18" fill="none"
            >
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M13.5 13.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="공연명, 배우, 장르로 검색..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Type filter chips */}
        <div className="flex gap-2 px-5 pb-3 overflow-x-auto scrollbar-hide">
          {TYPE_FILTERS.map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className="text-badge flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all"
              style={{
                background: typeFilter === type ? '#D4AF37' : '#1A1A1A',
                color: typeFilter === type ? '#0A0A0A' : '#888',
                boxShadow: typeFilter === type ? '0 0 12px rgba(212,175,55,0.2)' : 'none',
              }}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Hashtag filters */}
        <div className="flex gap-2 px-5 pb-4 overflow-x-auto scrollbar-hide">
          {HASHTAG_FILTERS.map((tag) => {
            const isActive = activeHashtags.includes(tag)
            return (
              <button
                key={tag}
                onClick={() => toggleHashtag(tag)}
                className="text-badge flex-shrink-0 px-3 py-1.5 rounded-full font-medium transition-all border"
                style={{
                  borderColor: isActive ? '#D4AF37' : '#2A2A2A',
                  background: isActive ? 'rgba(212,175,55,0.12)' : 'transparent',
                  color: isActive ? '#D4AF37' : '#888',
                }}
              >
                {tag}
              </button>
            )
          })}
        </div>
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between px-5 mb-4">
        <p className="text-body text-muted-foreground">
          <span className="text-foreground font-medium">{filtered.length}</span>개의 공연
        </p>
        <button
          onClick={() => setIsGrid((g) => !g)}
          className="p-2 rounded-lg bg-card border border-border text-muted-foreground"
        >
          {isGrid ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          )}
        </button>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-5 text-center">
          <div className="text-4xl mb-4">🎭</div>
          <p className="text-foreground font-medium mb-2">검색 결과가 없어요</p>
          <p className="text-muted-foreground text-sm">다른 검색어나 필터를 시도해보세요</p>
        </div>
      ) : isGrid ? (
        <div className="grid grid-cols-2 gap-3 px-5">
          {filtered.map((perf) => (
            <div key={perf.id} className="bg-card rounded-2xl border border-border overflow-hidden">
              <div
                className="w-full aspect-[3/4] flex items-center justify-center text-4xl"
                style={{ background: perf.posterColor }}
              >
                {perf.posterImage ? (
                  <img 
                    src={perf.posterImage}
                    alt={perf.title}
                    className="w-full h-full object-cover"
                  />
                ) : perf.posterEmoji}
              </div>
              <div className="p-3">
                <p className="text-xs text-muted-foreground mb-1">{perf.type}</p>
                <p className="font-medium text-foreground text-sm leading-tight">{perf.title}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {perf.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-1.5 py-0.5 rounded-full"
                      style={{
                        background: userTags.includes(tag) ? 'rgba(212,175,55,0.15)' : '#1A1A1A',
                        color: userTags.includes(tag) ? '#D4AF37' : '#888',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-5">
          {filtered.map((perf) => (
            <PerformanceCard key={perf.id} performance={perf} userTags={userTags} size="lg" />
          ))}
        </div>
      )}
    </div>
  )
}
