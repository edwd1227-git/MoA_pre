'use client'

import { useEffect, useMemo, useState } from 'react'
import { useApp } from '@/lib/store'
import { PERFORMANCES } from '@/lib/data'
import { Star } from 'lucide-react'

const SEAT_REVIEWS = [
  {
    id: '1',
    seatNumber: 'R열 10번',
    section: 'R석',
    rating: 5,
    comment: '시야가 정말 좋습니다! 무대를 정면에서 볼 수 있고, 배우들의 표정까지 선명하게 보여요.',
    date: '2025-03-20',
    imageUrl: 'https://picsum.photos/200/150?random=10'
  },
  {
    id: '2',
    seatNumber: 'S열 5번',
    section: 'S석',
    rating: 4,
    comment: '좌측 경사각에서 보지만 화면은 충분히 크고 소리도 좋습니다.',
    date: '2025-03-18',
    imageUrl: 'https://picsum.photos/200/150?random=11'
  },
  {
    id: '3',
    seatNumber: 'VIP 2열 8번',
    section: 'VIP',
    rating: 5,
    comment: '최고의 전망대! 배우들과 거의 눈을 맞출 수 있을 정도로 가깝습니다.',
    date: '2025-03-15',
    imageUrl: 'https://picsum.photos/200/150?random=12'
  },
  {
    id: '4',
    seatNumber: 'A열 25번',
    section: 'A석',
    rating: 3,
    comment: '후방 좌측이라 일부 무대가 기둥에 가립니다. 그래도 시청은 가능해요.',
    date: '2025-03-10',
    imageUrl: 'https://picsum.photos/200/150?random=13'
  },
]

const SECTION_COLORS: Record<string, string> = {
  VIP: '#D4AF37',
  R: '#FF6B6B',
  S: '#4ECDC4',
  A: '#95E1D3',
}

type SeatViewResult = {
  title: string
  link: string
  description: string
}

export function SeatViewScreen() {
  const { setScreen, selectedPerformanceId } = useApp()
  const [isLoadingSeatInfo, setIsLoadingSeatInfo] = useState(false)
  const [seatInfoResults, setSeatInfoResults] = useState<SeatViewResult[]>([])

  const selectedPerformance = useMemo(
    () => PERFORMANCES.find((performance) => performance.id === selectedPerformanceId),
    [selectedPerformanceId]
  )

  useEffect(() => {
    const venue = selectedPerformance?.venue?.trim()
    if (!venue) {
      setSeatInfoResults([])
      return
    }

    let isMounted = true

    const fetchSeatInfo = async () => {
      setIsLoadingSeatInfo(true)
      try {
        const response = await fetch(`/api/seat-view?venue=${encodeURIComponent(venue)}`)
        if (!response.ok) {
          throw new Error('Failed to fetch seat-view data')
        }
        const data = (await response.json()) as { results?: SeatViewResult[] }
        if (isMounted) {
          setSeatInfoResults(data.results ?? [])
        }
      } catch {
        if (isMounted) {
          setSeatInfoResults([])
        }
      } finally {
        if (isMounted) {
          setIsLoadingSeatInfo(false)
        }
      }
    }

    fetchSeatInfo()

    return () => {
      isMounted = false
    }
  }, [selectedPerformance?.venue])

  return (
    <div className="page-fade-in pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/95 px-4 py-4 backdrop-blur">
        <button
          onClick={() => setScreen('detail')}
          className="mb-3 inline-block rounded px-2 py-1 text-muted-foreground hover:text-foreground"
        >
          ← 돌아가기
        </button>
        <h1 className="font-serif text-2xl font-bold text-foreground">좌석 시야 보기</h1>
      </div>

      <div className="space-y-6 px-4 py-6">
        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <h2 className="font-semibold text-foreground">공연장 좌석배치도</h2>
          {selectedPerformance?.venue && (
            <p className="text-sm text-muted-foreground">
              {selectedPerformance.venue} 관련 공식/참고 정보를 모아봤어요.
            </p>
          )}

          {isLoadingSeatInfo ? (
            <div className="flex items-center gap-3 rounded-lg border border-border bg-background/60 p-4">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-[#D4AF37]" />
              <p className="text-sm text-muted-foreground">좌석 정보를 불러오는 중...</p>
            </div>
          ) : seatInfoResults.length > 0 ? (
            <div className="space-y-3">
              {seatInfoResults.map((result) => (
                <div
                  key={result.link}
                  className="space-y-2 rounded-lg border border-border bg-background/50 p-4"
                >
                  <h3 className="font-medium text-foreground">{result.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {result.description}
                  </p>
                  <button
                    onClick={() => window.open(result.link, '_blank', 'noopener,noreferrer')}
                    className="inline-flex rounded-md border border-[#D4AF37]/40 px-3 py-1.5 text-sm font-medium text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  >
                    링크 열기
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">공식 정보를 찾을 수 없습니다</p>
          )}
        </div>

        {/* Review Photos */}
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">관람객 사진</h2>
          <div className="grid grid-cols-2 gap-3">
            {SEAT_REVIEWS.map((review) => (
              <div key={review.id} className="rounded-lg overflow-hidden bg-card">
                <img 
                  src={review.imageUrl} 
                  alt="Seat view"
                  className="h-32 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Seat Reviews */}
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">좌석 리뷰</h2>
          <div className="space-y-3">
            {SEAT_REVIEWS.map((review) => (
              <div key={review.id} className="rounded-lg bg-card p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-foreground">{review.seatNumber}</div>
                    <div 
                      className="inline-block rounded px-2 py-1 text-xs font-medium text-black mt-1"
                      style={{ backgroundColor: SECTION_COLORS[review.section] }}
                    >
                      {review.section}석
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={16} fill="#D4AF37" stroke="#D4AF37" />
                    ))}
                  </div>
                </div>
                
                <p className="text-sm text-foreground leading-relaxed">{review.comment}</p>
                <p className="text-xs text-muted-foreground">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
