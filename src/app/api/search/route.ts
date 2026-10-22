import { TMDBFetch } from '@/lib/fetcher'
import { notFound } from 'next/navigation'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const query = searchParams.get('query')
  if (!query) notFound()

  const result = await TMDBFetch(`/search/multi?query=${query}`)
  return Response.json(result)
}
