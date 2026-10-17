import MediaCreditsSection from '@/components/medias/sections/credits'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMediaCredits } from '@/types/tmdb'

export default async function MovieCreditSection({ id }: { id: string }) {
  const result = await TMDBFetch<TMediaCredits>(`/movie/${id}/credits`)

  if (!result.isSuccess) return <p>error</p>

  return <MediaCreditsSection credits={result.data} />
}
