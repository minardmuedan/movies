import MediaCreditsSection from '@/components/medias/sections/credits'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMediaCredits } from '@/schema & types/tmdb'

export default async function MovieCreditSection({ movie_id }: { movie_id: string }) {
  return <MediaCreditsSection result={await TMDBFetch<TMediaCredits>(`/movie/${movie_id}/credits`)} />
}
