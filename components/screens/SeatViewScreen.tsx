'use client'

import { useApp } from '@/lib/store'
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

export function SeatViewScreen() {
  const { setScreen } = useApp()

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
        {/* Theater Layout */}
        <div className="space-y-4 rounded-lg bg-card p-6">
          <h2 className="font-semibold text-foreground">무대 배치도</h2>
          
          <div className="bg-secondary/50 p-6 rounded-lg">
            {/* Stage */}
            <div className="mb-8 rounded-lg bg-gradient-to-b from-foreground/20 to-foreground/5 p-4 text-center">
              <p className="text-sm font-semibold text-muted-foreground">STAGE</p>
            </div>

            {/* Sections */}
            <div className="space-y-4">
              {['VIP', 'R', 'S', 'A'].map((section) => (
                <div key={section} className="flex items-center gap-4">
                  <div 
                    className="h-12 w-16 rounded flex items-center justify-center font-semibold text-black"
                    style={{ backgroundColor: SECTION_COLORS[section] }}
                  >
                    {section}
                  </div>
                  <div className="flex flex-1 gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-8 w-4 rounded border"
                        style={{ 
                          backgroundColor: `${SECTION_COLORS[section]}20`,
                          borderColor: SECTION_COLORS[section]
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            <p className="text-center">각 섹션의 시야는 무대에서의 거리와 각도에 따라 다릅니다.</p>
          </div>
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
