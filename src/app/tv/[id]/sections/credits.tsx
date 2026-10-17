import MediaCreditsSection from '@/components/medias/sections/credits'
import { TMDBFetch } from '@/lib/fetcher'
import { TMediaCredits } from '@/types/tmdb'

export default async function TvCreditsSection({ id }: { id: string }) {
  const result = await TMDBFetch<TMediaCredits>(`/tv/${id}/credits`)
  if (!result.isSuccess) return <p>error</p>
  return <MediaCreditsSection credits={result.data} />
}
