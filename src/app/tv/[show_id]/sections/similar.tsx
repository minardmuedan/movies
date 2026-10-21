import MediaSimilarSection from '@/components/medias/sections/similar'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovies } from '@/types/tmdb'

export default async function TvSimilarSection({ show_id }: { show_id: string }) {
  const result = await TMDBFetch<TMovies>(`/tv/${show_id}/similar`)
  if (!result.isSuccess) return <p>error</p>
  return <MediaSimilarSection datas={result.data.results} />
}
