import MediaCreditsSection from '@/components/medias/sections/credits'
import { TMDBFetch } from '@/lib/fetcher'
import { TMediaCredits } from '@/types/tmdb'

export default async function TvCreditsSection({ show_id }: { show_id: string }) {
  const result = await TMDBFetch<TMediaCredits>(`/tv/${show_id}/credits`)
  if (!result.isSuccess) return <p>error</p>
  return <MediaCreditsSection credits={result.data} />
}
