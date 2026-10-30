import MediaRecommendationsSection from '@/components/medias/sections/recommendations'
import { TMDBFetch } from '@/lib/fetcher'
import type { TTvShows } from '@/schema & types/tmdb'

export default async function TvRecommendationsSection({ show_id }: { show_id: string }) {
  const result = await TMDBFetch<TTvShows>(`/tv/${show_id}/recommendations`)
  if (!result.isSuccess) return <p>error</p>
  return <MediaRecommendationsSection datas={result.data.results} />
}
