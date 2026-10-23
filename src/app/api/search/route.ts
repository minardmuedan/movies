import { TMDBFetch } from '@/lib/fetcher'
import { TMDB_MEDIA, type TTMDB_MEDIA } from '@/lib/tmdb'
import { TMovies, type TTvShows } from '@/types/tmdb'
import { notFound } from 'next/navigation'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const query = searchParams.get('query')
  if (!query) notFound()

  const page = Number(searchParams.get('page')) || 1

  const mediaType = searchParams.get('media_type') || ''
  const validatedMediaType = TMDB_MEDIA.includes(mediaType as TTMDB_MEDIA) ? mediaType : 'movie'

  const result = await TMDBFetch<TMovies | TTvShows>(`/search/${validatedMediaType}?query=${query}&page=${page}`)
  if (!result.isSuccess) throw ''

  return Response.json(result.data)
}
