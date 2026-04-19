'use client'

import { useState } from 'react'
import { useApp } from '@/lib/store'
import { PERFORMANCES } from '@/lib/data'
import type { ViewingRecord } from '@/lib/data'

const DAYS = ['일', '월', '화', '수', '목', '금', '토']
const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

function StarRating({ rating, onChange }: { rating: number; onChange?: (r: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange?.(star)}
          className="transition-transform active:scale-110"
          disabled={!onChange}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 2L12.39 7.26L18 8.07L14 12L15.18 17.73L10 14.77L4.82 17.73L6 12L2 8.07L7.61 7.26L10 2Z"
              fill={star <= rating ? '#D4AF37' : 'none'}
              stroke={star <= rating ? '#D4AF37' : '#2A2A2A'}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ))}
    </div>
  )
}

type AddModalProps = {
  onClose: () => void
  onSave: (record: Omit<ViewingRecord, 'id'>) => void
}

function AddRecordModal({ onClose, onSave }: AddModalProps) {
  const [selectedPerformance, setSelectedPerformance] = useState<string>('')
  const [date, setDate] = useState('')
  const [rating, setRating] = useState(5)
  const [memo, setMemo] = useState('')
  const [search, setSearch] = useState('')

  const filtered = PERFORMANCES.filter((p) => p.title.includes(search))
  const selected = PERFORMANCES.find((p) => p.id === selectedPerformance)

  function handleSave() {
    if (!selected || !date) return
    onSave({
      performanceId: selected.id,
      performanceTitle: selected.title,
      date,
      venue: selected.venue,
      rating,
      memo,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/70">
      <div className="w-full bg-card rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="title-card text-foreground">관람 기록 추가</h3>
          <button onClick={onClose} className="p-2 text-muted-foreground">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Performance search */}
        <div className="mb-4">
          <label className="text-badge text-muted-foreground mb-2 block">공연 선택</label>
          <input
            type="text"
            placeholder="공연명으로 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
          {search && (
            <div className="mt-2 bg-secondary rounded-xl border border-border overflow-hidden">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setSelectedPerformance(p.id); setSearch('') }}
                  className="w-full text-left px-4 py-3 text-body text-foreground hover:bg-muted transition-colors border-b border-border last:border-0"
                >
                  <span className="font-medium">{p.title}</span>
                  <span className="text-muted-foreground ml-2">{p.type}</span>
                </button>
              ))}
            </div>
          )}
          {selected && (
            <div className="mt-2 px-4 py-3 bg-primary/10 border border-primary/30 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-body text-foreground font-medium">{selected.title}</p>
                <p className="text-badge text-muted-foreground">{selected.venue}</p>
              </div>
              <button onClick={() => setSelectedPerformance('')} className="text-muted-foreground">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="text-badge text-muted-foreground mb-2 block">관람 날짜</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-body text-foreground focus:outline-none focus:border-primary [color-scheme:dark]"
          />
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label className="text-badge text-muted-foreground mb-2 block">별점</label>
          <StarRating rating={rating} onChange={setRating} />
        </div>

        {/* Memo */}
        <div className="mb-6">
          <label className="text-badge text-muted-foreground mb-2 block">메모 (선택)</label>
          <textarea
            placeholder="관람 소감을 자유롭게 남겨보세요..."
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            rows={3}
            className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={!selected || !date}
          className="text-body w-full py-4 font-bold rounded-xl transition-all disabled:opacity-30"
          style={{
            background: selected && date ? '#D4AF37' : '#2A2A2A',
            color: selected && date ? '#0A0A0A' : '#888',
            boxShadow: selected && date ? '0 0 20px rgba(212,175,55,0.2)' : 'none',
          }}
        >
          기록 저장하기
        </button>
      </div>
    </div>
  )
}

export default function CalendarScreen() {
  const { viewingRecords, addRecord } = useApp()
  const [showModal, setShowModal] = useState(false)

  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const markedDates = new Set(
    viewingRecords
      .filter((r) => {
        const d = new Date(r.date)
        return d.getFullYear() === year && d.getMonth() === month
      })
      .map((r) => new Date(r.date).getDate())
  )

  const monthRecords = viewingRecords.filter((r) => {
    const d = new Date(r.date)
    return d.getFullYear() === year && d.getMonth() === month
  })

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  const calendarCells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <h1 className="title-section text-foreground mb-1">관람 기록</h1>
        <p className="text-body text-muted-foreground">나의 공연 여정을 기록해보세요</p>
      </div>

      {/* Calendar */}
      <div className="mx-5 mb-6 bg-card rounded-2xl border border-border p-4">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-2 text-muted-foreground">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 14L6 9L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <p className="title-card text-foreground">
            {year}년 {MONTHS[month]}
          </p>
          <button onClick={nextMonth} className="p-2 text-muted-foreground">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 14L12 9L7 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {DAYS.map((d, i) => (
            <div key={d} className="text-badge text-center py-1"
              style={{ color: i === 0 ? '#ef4444' : i === 6 ? '#6b9fff' : '#888' }}>
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-y-1">
          {calendarCells.map((day, i) => (
            <div key={i} className="flex items-center justify-center aspect-square">
              {day !== null ? (
                <div className="relative w-8 h-8 flex items-center justify-center">
                  {markedDates.has(day) && (
                    <div className="absolute inset-0 rounded-full"
                      style={{ background: 'rgba(212,175,55,0.2)', border: '1px solid rgba(212,175,55,0.5)' }} />
                  )}
                  <span className="relative text-badge font-medium"
                    style={{
                      color: markedDates.has(day) ? '#D4AF37'
                        : i % 7 === 0 ? '#ef4444'
                        : i % 7 === 6 ? '#6b9fff'
                        : '#FFF5E4',
                    }}>
                    {day}
                  </span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Records list */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-body text-foreground font-medium">
            {MONTHS[month]} 기록
            <span className="text-badge text-muted-foreground ml-2">({monthRecords.length}개)</span>
          </p>
        </div>

        {monthRecords.length === 0 ? (
          <div className="flex flex-col items-center py-10 text-center">
            <div className="text-4xl mb-3">📅</div>
            <p className="text-body text-foreground font-medium mb-1">이번 달 기록이 없어요</p>
            <p className="text-body text-muted-foreground">공연을 보셨다면 기록해보세요</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {monthRecords.map((record) => (
              <div key={record.id} className="bg-card rounded-2xl border border-border p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="text-body text-foreground font-medium">{record.performanceTitle}</p>
                    <p className="text-badge text-muted-foreground mt-0.5">{record.venue}</p>
                  </div>
                  <p className="text-badge text-muted-foreground flex-shrink-0">
                    {new Date(record.date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="mb-2">
                  <StarRating rating={record.rating} />
                </div>
                {record.memo && (
                  <p className="text-body text-muted-foreground leading-relaxed">{record.memo}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-24 right-5 w-14 h-14 rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl shadow-lg transition-transform active:scale-95 z-30"
        style={{ background: '#D4AF37', boxShadow: '0 0 24px rgba(212,175,55,0.2)' }}
      >
        +
      </button>

      {showModal && (
        <AddRecordModal
          onClose={() => setShowModal(false)}
          onSave={addRecord}
        />
      )}
    </div>
  )
}
