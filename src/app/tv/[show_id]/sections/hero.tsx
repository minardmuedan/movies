import MediaHeroSection from '@/components/medias/sections/hero'
import { TMDBFetch } from '@/lib/fetcher'
import { TTvDetails } from '@/schema & types/tmdb'

export default async function TvHeroSection({ show_id }: { show_id: string }) {
  return <MediaHeroSection result={await TMDBFetch<TTvDetails>(`/tv/${show_id}`)} />
}
