import MediaCreditsSection from '@/components/medias/sections/credits'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMediaCredits } from '@/schema & types/tmdb'

export default async function MovieCreditSection({ movie_id }: { movie_id: string }) {
  const result = await TMDBFetch<TMediaCredits>(`/movie/${movie_id}/credits`)

  if (!result.isSuccess) return <p>error</p>

  return <MediaCreditsSection credits={result.data} />
}
