import MediaRecommendationsSection from '@/components/medias/sections/recommendations'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovies } from '@/types/tmdb'

export default async function MovieRecommendationsSection({ id }: { id: string }) {
  const result = await TMDBFetch<TMovies>(`/movie/${id}/recommendations`)

  if (!result.isSuccess) return <p>error</p>

  return <MediaRecommendationsSection datas={result.data.results} />
}
