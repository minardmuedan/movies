import MediaKeywordsSection from '@/components/medias/sections/keywords'
import { TMDBFetch } from '@/lib/fetcher'
import { type TTvKeywords } from '@/schema & types/tmdb'

export default async function TvKeywordsSection({ show_id }: { show_id: string }) {
  const result = await TMDBFetch<TTvKeywords>(`/tv/${show_id}/keywords`)
  if (!result.isSuccess) return <p>error</p>
  return <MediaKeywordsSection type="tv-shows" keywords={result.data.results} />
}
