'use client'

import type { Performance } from '@/lib/data'
import { useApp } from '@/lib/store'

type Props = {
  performance: Performance
  userTags?: string[]
  size?: 'sm' | 'md' | 'lg'
}

export default function PerformanceCard({ performance, userTags = [], size = 'md' }: Props) {
  const { setScreen } = useApp()

  const handleClick = () => {
    setScreen('detail', performance.id)
  }

  const matchingTags = performance.tags.filter((tag) =>
    userTags.some((ut) => performance.tags.includes(ut) || ut === tag)
  )

  if (size === 'sm') {
    return (
      <button onClick={handleClick} className="flex gap-3 p-3 bg-card rounded-xl border border-border w-full text-left hover:border-accent transition">
        {/* Poster */}
        <div className="w-14 h-20 rounded-lg flex-shrink-0 overflow-hidden bg-secondary">
          <img 
            src={performance.posterImage}
            alt={performance.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-badge text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
              {performance.type}
            </span>
          </div>
          <p className="text-body font-medium text-foreground truncate">{performance.title}</p>
          <p className="text-badge text-muted-foreground mt-1 truncate">{performance.venue}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {performance.tags.map((tag) => (
              <span
                key={tag}
                className="text-badge px-1.5 py-0.5 rounded-full"
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
      </button>
    )
  }

  if (size === 'lg') {
    return (
      <button onClick={handleClick} className="flex gap-4 p-4 bg-card rounded-2xl border border-border hover:border-accent transition text-left">
        <div className="w-20 h-28 rounded-xl flex-shrink-0 overflow-hidden bg-secondary">
          <img 
            src={performance.posterImage}
            alt={performance.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-badge text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
              {performance.type}
            </span>
            {performance.matchScore && (
              <span className="text-badge font-medium px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(212,175,55,0.15)', color: '#D4AF37' }}>
                잘 맞아요 {performance.matchScore}%
              </span>
            )}
          </div>
          <p className="title-card text-foreground">{performance.title}</p>
          <p className="text-body text-muted-foreground mt-1">{performance.venue}</p>
          <div className="flex flex-wrap gap-1 mt-3">
            {performance.tags.map((tag) => (
              <span
                key={tag}
                className="text-badge px-2 py-1 rounded-full"
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
      </button>
    )
  }

  // Default: md - horizontal scroll card
  return (
    <button onClick={handleClick} className="w-44 flex-shrink-0 bg-card rounded-2xl border border-border overflow-hidden hover:border-accent transition">
      {/* Poster */}
      <div className="w-full h-56 relative overflow-hidden bg-secondary">
        <img 
          src={performance.posterImage}
          alt={performance.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {performance.matchScore && (
          <div
            className="absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full"
            style={{ background: 'rgba(0,0,0,0.7)', color: '#D4AF37', backdropFilter: 'blur(4px)' }}
          >
            {performance.matchScore}%
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-center gap-1 mb-1">
          <span className="text-badge text-muted-foreground">{performance.type}</span>
        </div>
        <p className="text-body font-medium text-foreground leading-tight mb-1">
          {performance.title}
        </p>
        <p className="text-badge text-muted-foreground mb-2 truncate">{performance.venue}</p>
        <div className="flex flex-wrap gap-1">
          {performance.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-badge px-1.5 py-0.5 rounded-full"
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
    </button>
  )
}

