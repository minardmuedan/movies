import MediaCreditsSection from '@/components/medias/sections/credits'
import { TMDBFetch } from '@/lib/fetcher'
import { TMediaCredits } from '@/schema & types/tmdb'

export default async function TvCreditsSection({ show_id }: { show_id: string }) {
  return <MediaCreditsSection result={await TMDBFetch<TMediaCredits>(`/tv/${show_id}/credits`)} />
}
