'use client'

import { useApp } from '@/lib/store'

const GUIDE_SECTIONS = [
  {
    title: '📋 관람 전 준비',
    items: [
      '예매 방법 (인터파크/멜론티켓/네이버)',
      '복장 규정 없음, 편한 옷 OK',
      '공연 30분 전 도착 권장',
    ],
  },
  {
    title: '🎭 공연장 에티켓',
    items: [
      '공연 중 휴대폰 무음/화면 끄기',
      '사진 촬영 커튼콜 때만 가능',
      '음식물 반입 불가 (물 제외)',
      '늦게 도착 시 1막 끝나고 입장',
    ],
  },
  {
    title: '💺 좌석 선택 팁',
    items: [
      'VIP/R석: 무대 정면, 표정까지 보임',
      'S석: 가성비 최고, 전체 무대 조망',
      'A석: 저렴하지만 시야 제한 있을 수 있음',
      '2층 앞줄: 전체 무대 한눈에 보기 좋음',
    ],
  },
  {
    title: '🎵 뮤지컬 vs 연극 차이',
    items: [
      '뮤지컬: 노래+춤+연기, 화려한 무대',
      '연극: 대사와 연기 중심, 몰입감 강함',
      '초보자에게는 뮤지컬 추천',
    ],
  },
]

export function GuideScreen() {
  const { setScreen } = useApp()

  return (
    <div className="page-fade-in min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-10 border-b border-border bg-background/95 px-4 py-4 backdrop-blur">
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => setScreen('home')}
            className="absolute left-0 rounded px-2 py-1 text-sm font-medium text-[#D4AF37] hover:opacity-90"
          >
            ← 뒤로가기
          </button>
          <h1 className="font-serif text-xl font-bold text-foreground">공연 입문 가이드</h1>
        </div>
      </div>

      <div className="space-y-6 px-4 py-6">
        <section>
          <h2 className="font-serif text-3xl font-bold text-foreground">공연 입문 가이드</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            처음이어도 괜찮아요, 함께 알아봐요 🎬
          </p>
        </section>

        <section className="space-y-4">
          {GUIDE_SECTIONS.map((section) => (
            <div
              key={section.title}
              className="rounded-xl border border-border bg-card p-4"
            >
              <h3 className="mb-3 text-base font-semibold text-[#D4AF37]">{section.title}</h3>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <p key={item} className="text-sm leading-relaxed text-foreground">
                    <span className="text-[#D4AF37]">· </span>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
