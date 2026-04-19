'use client'

import { useApp } from '@/lib/store'
import { PERFORMANCES } from '@/lib/data'
import { Star, Clock, MapPin, Ticket, Eye, ShoppingCart } from 'lucide-react'

export function DetailScreen() {
  const { selectedPerformanceId, setScreen } = useApp()
  
  const performance = PERFORMANCES.find(p => p.id === selectedPerformanceId)
  
  if (!performance) {
    return <div className="p-4 text-center text-muted-foreground">공연을 찾을 수 없습니다.</div>
  }

  return (
    <div className="page-fade-in pb-20">
      {/* Poster Image */}
      <div className="relative h-96 w-full overflow-hidden bg-card">
        <img 
          src={performance.posterImage} 
          alt={performance.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => setScreen('home')}
          className="absolute left-4 top-4 rounded-full bg-black/50 p-2 text-foreground hover:bg-black/70"
        >
          ←
        </button>
      </div>

      {/* Content */}
      <div className="space-y-6 px-4 py-6">
        {/* Title & Type */}
        <div>
          <div className="mb-2 inline-block rounded bg-accent/10 px-3 py-1 text-badge font-semibold text-accent">
            {performance.type}
          </div>
          <h1 className="title-main text-foreground">{performance.title}</h1>
          <p className="text-body mt-2 text-muted-foreground">{performance.venue}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {performance.tags.map((tag) => (
            <span 
              key={tag}
              className="text-badge rounded-full px-3 py-1 font-medium"
              style={{
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                color: '#D4AF37'
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <div className="space-y-2 border-t border-border pt-4">
          <p className="text-body leading-relaxed text-foreground">{performance.description}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-card p-4">
            <div className="mb-2 flex items-center gap-2 text-accent">
              <Clock size={18} />
              <span className="text-badge uppercase text-muted-foreground">러닝타임</span>
            </div>
            <p className="text-body font-semibold text-foreground">{performance.duration}</p>
          </div>
          
          <div className="rounded-lg bg-card p-4">
            <div className="mb-2 flex items-center gap-2 text-accent">
              <MapPin size={18} />
              <span className="text-badge uppercase text-muted-foreground">공연기간</span>
            </div>
            <p className="text-body font-semibold text-foreground">{performance.period}</p>
          </div>
          
          <div className="col-span-2 rounded-lg bg-card p-4">
            <div className="mb-2 flex items-center gap-2 text-accent">
              <Ticket size={18} />
              <span className="text-badge uppercase text-muted-foreground">티켓 가격</span>
            </div>
            <p className="text-body font-semibold text-foreground">{performance.priceRange}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <button
            onClick={() => setScreen('seatView', performance.id)}
            className="text-body flex w-full items-center justify-center gap-2 rounded-lg border border-accent bg-transparent px-4 py-3 font-semibold text-accent transition hover:bg-accent/10"
          >
            <Eye size={20} />
            좌석 시야 보기
          </button>
          
          <button
              onClick={() => {
                if (performance.bookingUrl) {
                  window.open(performance.bookingUrl, '_blank')
                }
              }}
            className="text-body flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold text-primary-foreground transition"
            style={{
              backgroundColor: '#D4AF37',
            }}
          >
            <ShoppingCart size={20} />
            예매하기
          </button>
        </div>
      </div>
    </div>
  )
}
