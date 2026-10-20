import SeasonSidebar from '@/components/medias/season-sidebar'
import { TMDBFetch } from '@/lib/fetcher'
import type { TTvDetails } from '@/types/tmdb'

export default async function TvSeasonsSidebar({ id }: { id: string }) {
  const result = await TMDBFetch<TTvDetails>(`/tv/${id}`)

  if (!result.isSuccess) return <p>error</p>
  return <SeasonSidebar showId={id} seasons={result.data.seasons} />
}
