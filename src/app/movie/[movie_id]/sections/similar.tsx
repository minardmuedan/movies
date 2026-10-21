import MediaSimilarSection from '@/components/medias/sections/similar'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovies } from '@/types/tmdb'

export default async function MovieSimilarSection({ movie_id }: { movie_id: string }) {
  const result = await TMDBFetch<TMovies>(`/movie/${movie_id}/similar`)

  if (!result.isSuccess) return <p>error</p>

  return <MediaSimilarSection datas={result.data.results} />
}
