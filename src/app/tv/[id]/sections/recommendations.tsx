import MediaRecommendationsSection from '@/components/medias/sections/recommendations'
import { TMDBFetch } from '@/lib/fetcher'
import type { TTvShows } from '@/types/tmdb'

export default async function TvRecommendationsSection({ id }: { id: string }) {
  const result = await TMDBFetch<TTvShows>(`/tv/${id}/recommendations`)
  if (!result.isSuccess) return <p>error</p>
  return <MediaRecommendationsSection datas={result.data.results} />
}
