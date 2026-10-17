import MediaHeroSection from '@/components/medias/sections/hero'
import { TMDBFetch } from '@/lib/fetcher'
import { TTvDetails } from '@/types/tmdb'

export default async function TvHeroSection({ id }: { id: string }) {
  const result = await TMDBFetch<TTvDetails>(`/tv/${id}`)
  if (!result.isSuccess) return <p>error</p>
  return <MediaHeroSection media={result.data} />
}
