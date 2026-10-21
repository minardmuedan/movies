import MediaMediasSection from '@/components/medias/sections/media'
import { TMDBFetch } from '@/lib/fetcher'
import { TMediaImages, type TMediaVideos } from '@/types/tmdb'

export default async function TvMediaSection({ show_id }: { show_id: string }) {
  const [imagesResult, videosResult] = await Promise.all([
    TMDBFetch<TMediaImages>(`/tv/${show_id}/images`),
    TMDBFetch<TMediaVideos>(`/tv/${show_id}/videos`),
  ])

  if (!imagesResult.isSuccess || !videosResult.isSuccess) return <p>error</p>

  return <MediaMediasSection images={imagesResult.data} videos={videosResult.data.results} />
}
