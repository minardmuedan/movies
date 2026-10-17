import MediaMediasSection from '@/components/medias/sections/media'
import { TMDBFetch } from '@/lib/fetcher'
import { TMediaImages, type TMediaVideos } from '@/types/tmdb'

export default async function TvMediaSection({ id }: { id: string }) {
  const [imagesResult, videosResult] = await Promise.all([TMDBFetch<TMediaImages>(`/tv/${id}/images`), TMDBFetch<TMediaVideos>(`/tv/${id}/videos`)])

  if (!imagesResult.isSuccess || !videosResult.isSuccess) return <p>error</p>

  return <MediaMediasSection images={imagesResult.data} videos={videosResult.data.results} />
}
