import MediaKeywordsSection from '@/components/medias/sections/keywords'
import { TMDBFetch } from '@/lib/fetcher'
import { type TTvKeywords } from '@/schema & types/tmdb'

export default async function TvKeywordsSection({ show_id }: { show_id: string }) {
  return <MediaKeywordsSection type="tv-shows" result={await TMDBFetch<TTvKeywords>(`/tv/${show_id}/keywords`)} />
}
