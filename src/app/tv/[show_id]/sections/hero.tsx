import MediaHeroSection from '@/components/medias/sections/hero'
import { TMDBFetch } from '@/lib/fetcher'
import { TTvDetails } from '@/types/tmdb'

export default async function TvHeroSection({ show_id }: { show_id: string }) {
  const result = await TMDBFetch<TTvDetails>(`/tv/${show_id}`)
  if (!result.isSuccess) return <p>error</p>
  return <MediaHeroSection media={result.data} />
}
