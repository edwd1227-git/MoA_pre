export type Performance = {
  id: string
  title: string
  type: '뮤지컬' | '연극' | '오페라'
  venue: string
  tags: string[]
  posterColor: string
  posterImage: string
  matchScore?: number
  description: string
  period: string
  duration: string
  priceRange: string
  bookingUrl: string 
}

export type ViewingRecord = {
  id: string
  performanceId: string
  performanceTitle: string
  date: string
  venue: string
  rating: number
  memo: string
}

export type SeatReview = {
  id: string
  seatNumber: string
  section: 'VIP' | 'R' | 'S' | 'A'
  rating: number
  comment: string
  date: string
  imageUrl: string
}

export const PERFORMANCES: Performance[] = [
  {
    id: '1',
    title: '레미제라블',
    type: '뮤지컬',
    venue: '블루스퀘어 신한카드홀',
    tags: ['#역사극', '#웅장한', '#감동적인'],
    posterColor: '#1a1a2e',
    posterImage: '/images/les_miserables.png',
    matchScore: 98,
    description: '혁명의 시대, 프랑스를 배경으로 펼쳐지는 인간의 위대한 사랑과 희생의 이야기. 세계적으로 사랑받는 불멸의 명작 뮤지컬이 한번 더 무대에 올랐다.',
    period: '2025.03.01 - 2025.06.30',
    duration: '170분 (인터미션 10분 포함)',
    priceRange: '55,000원 - 140,000원',
    bookingUrl: 'https://tickets.interpark.com/search?keyword=레미제라블',
  },
  {
    id: '2',
    title: '오페라의 유령',
    type: '뮤지컬',
    venue: '샤롯데씨어터',
    tags: ['#로맨스', '#몽환적인', '#스타캐스팅'],
    posterColor: '#16213e',
    posterImage: '/images/phantom_of_the_opera.png',
    matchScore: 94,
    description: '파리 오페라 극장의 지하에 숨어있는 신비한 유령과 아름다운 소프라노의 로맨틱한 만남. 스스로를 드라마틱하게 표현하는 환상의 무대.',
    period: '2025.02.15 - 2025.05.31',
    duration: '165분 (인터미션 10분 포함)',
    priceRange: '60,000원 - 150,000원',
    bookingUrl: 'https://tickets.interpark.com/search?keyword=오페라의 유령',
  },
  {
    id: '3',
    title: '햄릿',
    type: '연극',
    venue: '국립극단 명동예술극장',
    tags: ['#역사극', '#긴장감있는', '#실력파'],
    posterColor: '#0f3460',
    posterImage: '/images/hamlet.png',
    matchScore: 87,
    description: '셰익스피어의 대표작. 아버지의 죽음에 숨겨진 진실을 규명하려는 왕자 햄릿의 심리적 갈등과 비극을 그려낸다.',
    period: '2025.03.15 - 2025.04.20',
    duration: '150분 (인터미션 10분 포함)',
    priceRange: '30,000원 - 70,000원',
    bookingUrl: 'https://tickets.interpark.com/search?keyword=햄릿',
  },
  {
    id: '4',
    title: '시카고',
    type: '뮤지컬',
    venue: '디큐브아트센터',
    tags: ['#코미디', '#유쾌한', '#스타캐스팅'],
    posterColor: '#2c1810',
    posterImage: '/images/chicago.png',
    matchScore: 82,
    description: '1920년대 시카고의 재즈시대. 범죄, 유혹, 그리고 욕망이 얽혀있는 황금빛 밤의 도시. 세련된 음악과 춤으로 그려지는 매혹의 세계.',
    period: '2025.02.01 - 2025.08.31',
    duration: '155분 (인터미션 10분 포함)',
    priceRange: '50,000원 - 130,000원' ,
    bookingUrl: 'https://tickets.interpark.com/search?keyword=시카고',
  },
  {
    id: '5',
    title: '지킬앤하이드',
    type: '뮤지컬',
    venue: '충무아트센터 대극장',
    tags: ['#스릴러', '#긴장감있는', '#감동적인'],
    posterColor: '#1a0a2e',
    posterImage: '/images/jekyll_and_hyde.png',
    matchScore: 91,
    description: '인간 내면에 존재하는 선함과 악함. 과학자 지킬 박사가 자신의 어두운 면을 드러내게 되면서 벌어지는 비극적 전개.',
    period: '2025.04.01 - 2025.06.15',
    duration: '140분 (인터미션 포함)',
    priceRange: '45,000원 - 120,000원',
    bookingUrl: 'https://tickets.interpark.com/search?keyword=지킬앤하이드',
  },
  {
    id: '6',
    title: '노트르담 드 파리',
    type: '뮤지컬',
    venue: '세종문화회관 대극장',
    tags: ['#역사극', '#로맨스', '#웅장한'],
    posterColor: '#0d1b2a',
    posterImage: '/images/notre_dame_de_paris.png',
    matchScore: 89,
    description: '중세 파리, 노트르담 성당의 종지기 카지모도와 집시 여인 에스메랄다의 애달픈 사랑이야기. 웅장한 스케일의 감동 뮤지컬.',
    period: '2025.03.20 - 2025.07.31',
    duration: '170분 (인터미션 10분 포함)',
    priceRange: '55,000원 - 140,000원',
    bookingUrl: 'https://tickets.interpark.com/search?keyword=노트르담 드 파리',
  },
]

export const BEGINNER_PICKS: Performance[] = [
  PERFORMANCES[0],
  PERFORMANCES[1],
  PERFORMANCES[3],
]

export const TRENDING: Performance[] = [
  PERFORMANCES[4],
  PERFORMANCES[5],
  PERFORMANCES[2],
]

export const SAMPLE_RECORDS: ViewingRecord[] = [
  {
    id: 'r1',
    performanceId: '1',
    performanceTitle: '레미제라블',
    date: '2025-03-15',
    venue: '블루스퀘어 신한카드홀',
    rating: 5,
    memo: '정말 감동적이었다. 앙코르 장면에서 눈물이 났다.',
  },
  {
    id: 'r2',
    performanceId: '4',
    performanceTitle: '시카고',
    date: '2025-03-28',
    venue: '디큐브아트센터',
    rating: 4,
    memo: '배우들의 에너지가 넘쳤다. 재밌었어요!',
  },
  {
    id: 'r3',
    performanceId: '2',
    performanceTitle: '오페라의 유령',
    date: '2025-04-05',
    venue: '샤롯데씨어터',
    rating: 5,
    memo: '환상적인 무대였다. 다시 보고 싶다.',
  },
]

export const GENRE_OPTIONS = [
  { id: 'history', label: '역사극', icon: '🏛️', tag: '#역사극' },
  { id: 'romance', label: '로맨스', icon: '💕', tag: '#로맨스' },
  { id: 'comedy', label: '코미디', icon: '😄', tag: '#코미디' },
  { id: 'thriller', label: '스릴러', icon: '😰', tag: '#스릴러' },
  { id: 'fantasy', label: '판타지', icon: '✨', tag: '#판타지' },
  { id: 'drama', label: '드라마', icon: '🎭', tag: '#드라마' },
]

export const MOOD_OPTIONS = [
  { id: 'grand', label: '웅장한', icon: '🏔️', tag: '#웅장한' },
  { id: 'moving', label: '감동적인', icon: '🥺', tag: '#감동적인' },
  { id: 'fun', label: '유쾌한', icon: '🎉', tag: '#유쾌한' },
  { id: 'tense', label: '긴장감있는', icon: '⚡', tag: '#긴장감있는' },
  { id: 'dreamy', label: '몽환적인', icon: '🌙', tag: '#몽환적인' },
  { id: 'warm', label: '따뜻한', icon: '☀️', tag: '#따뜻한' },
]

export const CAST_OPTIONS = [
  { id: 'star', label: '스타캐스팅 선호', icon: '⭐', tag: '#스타팬' },
  { id: 'skilled', label: '실력파 배우 선호', icon: '🎯', tag: '#실력파선호' },
  { id: 'any', label: '상관없음', icon: '🎪', tag: '#열린마음' },
]

export const EXPERIENCE_OPTIONS = [
  { id: 'first', label: '완전 처음이에요', icon: '🌱', tag: '#입문자' },
  { id: 'few', label: '1-2번 봤어요', icon: '🌿', tag: '#초보관람객' },
  { id: 'sometimes', label: '가끔 봐요', icon: '🌳', tag: '#취미관람' },
]

export const TAG_EMOJI_MAP: Record<string, string> = {
  '#역사극': '#역사덕후',
  '#로맨스': '#로맨스파',
  '#코미디': '#웃음추구',
  '#스릴러': '#스릴추구',
  '#판타지': '#판타지러버',
  '#드라마': '#드라마파',
  '#감동적인': '#감동추구',
  '#웅장한': '#웅장함추구',
  '#스타팬': '#스타팬',
  '#실력파선호': '#실력파선호',
}
