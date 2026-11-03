import MediaSimilarSection from '@/components/medias/sections/similar'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovies } from '@/schema & types/tmdb'

export default async function MovieSimilarSection({ movie_id }: { movie_id: string }) {
  return <MediaSimilarSection result={await TMDBFetch<TMovies>(`/movie/${movie_id}/similar`)} />
}
