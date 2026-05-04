import { NextResponse } from 'next/server'

type NaverWebResult = {
  title: string
  link: string
  description: string
}

type NaverWebResponse = {
  items?: NaverWebResult[]
}

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, '')
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const venue = searchParams.get('venue')?.trim()

  if (!venue) {
    return NextResponse.json({ error: 'venue is required' }, { status: 400 })
  }

  const clientId = process.env.NAVER_CLIENT_ID
  const clientSecret = process.env.NAVER_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'naver api credentials are missing' },
      { status: 500 }
    )
  }

  const query = `${venue} 좌석배치도`
  const naverUrl = `https://openapi.naver.com/v1/search/webkr.json?query=${encodeURIComponent(query)}&display=3&sort=sim`

  try {
    const response = await fetch(naverUrl, {
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'failed to fetch naver api' },
        { status: response.status }
      )
    }

    const data = (await response.json()) as NaverWebResponse
    const results = (data.items ?? []).slice(0, 3).map((item) => ({
      title: stripHtml(item.title),
      link: item.link,
      description: stripHtml(item.description),
    }))

    return NextResponse.json({ venue, results })
  } catch {
    return NextResponse.json(
      { error: 'unexpected error while fetching seat view data' },
      { status: 500 }
    )
  }
}
