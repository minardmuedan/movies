import MediaMediasSection from '@/components/medias/sections/media'
import { TMDBFetch } from '@/lib/fetcher'
import { TMediaImages, type TMediaVideos } from '@/types/tmdb'

export default async function MovieMediaSection({ movie_id }: { movie_id: string }) {
  const [imagesResult, videosResult] = await Promise.all([
    TMDBFetch<TMediaImages>(`/movie/${movie_id}/images`),
    TMDBFetch<TMediaVideos>(`/movie/${movie_id}/videos`),
  ])

  if (!imagesResult.isSuccess || !videosResult.isSuccess) return <p>error</p>

  return <MediaMediasSection images={imagesResult.data} videos={videosResult.data.results} />
}
