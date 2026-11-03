import MediaSimilarSection from '@/components/medias/sections/similar'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovies } from '@/schema & types/tmdb'

export default async function TvSimilarSection({ show_id }: { show_id: string }) {
  return <MediaSimilarSection result={await TMDBFetch<TMovies>(`/tv/${show_id}/similar`)} />
}
