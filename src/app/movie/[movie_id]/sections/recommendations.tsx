import MediaRecommendationsSection from '@/components/medias/sections/recommendations'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovies } from '@/schema & types/tmdb'

export default async function MovieRecommendationsSection({ movie_id }: { movie_id: string }) {
  return <MediaRecommendationsSection result={await TMDBFetch<TMovies>(`/movie/${movie_id}/recommendations`)} />
}
