import { TMDBFetch } from '@/lib/fetcher'
import { notFound } from 'next/navigation'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ media_id: string }> }) {
  const { searchParams } = req.nextUrl

  const { media_id } = await params
  if (!media_id) return notFound()

  const mediaType = searchParams.get('media_type') || ''
  const validatedMediaType = ['movie', 'tv'].includes(mediaType) ? mediaType : 'movie'
  const page = Number(searchParams.get('page')) || 1

  const result = await TMDBFetch(`/${validatedMediaType}/${media_id}/reviews?page=${page}`)
  if (!result.isSuccess) return Response.json(null, { status: 500 })

  return Response.json(result.data)
}
