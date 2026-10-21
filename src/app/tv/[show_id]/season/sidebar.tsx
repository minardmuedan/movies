import SeasonSidebar from '@/components/medias/season-sidebar'
import { TMDBFetch } from '@/lib/fetcher'
import type { TTvDetails } from '@/types/tmdb'

export default async function TvSeasonsSidebar({ show_id }: { show_id: string }) {
  const result = await TMDBFetch<TTvDetails>(`/tv/${show_id}`)

  if (!result.isSuccess) return <p>error</p>
  return <SeasonSidebar show_id={show_id} seasons={result.data.seasons} showName={result.data.name} />
}
