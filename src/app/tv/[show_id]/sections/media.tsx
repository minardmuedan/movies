import MediaMediasSection from '@/components/medias/sections/media'
import { TMDBFetch } from '@/lib/fetcher'
import { TMediaImages, type TMediaVideos } from '@/schema & types/tmdb'

export default async function TvMediaSection({ show_id }: { show_id: string }) {
  const results = await Promise.all([TMDBFetch<TMediaImages>(`/tv/${show_id}/images`), TMDBFetch<TMediaVideos>(`/tv/${show_id}/videos`)])

  return <MediaMediasSection results={results} />
}
