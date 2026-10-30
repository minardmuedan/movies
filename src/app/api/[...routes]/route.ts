import { TMDBFetch } from '@/lib/fetcher'
import { TMDB_MEDIA, type TTMDB_MEDIA } from '@/lib/tmdb'
import { TMovies, type TTvShows } from '@/schema & types/tmdb'
import { notFound } from 'next/navigation'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ routes: string | undefined[] }> }) {
  const { routes } = await params
  const { searchParams } = req.nextUrl
  const page = Number(searchParams.get('page')) || 1
  const mediaType = searchParams.get('media_type') || ''
  const validatedMediaType = TMDB_MEDIA.includes(mediaType as TTMDB_MEDIA) ? mediaType : 'movie'

  if (routes[0] === 'search') {
    const query = searchParams.get('query')
    if (!query) notFound()

    if (routes.length === 1) {
      const result = await TMDBFetch<TMovies | TTvShows>(`/search/${validatedMediaType}?query=${query}&page=${page}`)
      if (!result.isSuccess) throw ''
      return Response.json(result.data)
    }

    if (routes[1] === 'keyword') {
      const result = await TMDBFetch<TMovies | TTvShows>(`/search/keyword?query=${query}`)
      if (!result.isSuccess) throw ''
      return Response.json(result.data)
    }
  }

  if (routes[0] === 'reviews' && routes[1]) {
    const media_id = routes[1]
    const result = await TMDBFetch(`/${validatedMediaType}/${media_id}/reviews?page=${page}`)
    if (!result.isSuccess) return Response.json(null, { status: 500 })
    return Response.json(result.data)
  }

  return notFound()
}
