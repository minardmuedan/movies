import MediaMediasSection from '@/components/medias/sections/media'
import { TMDBFetch } from '@/lib/fetcher'
import { TMediaImages, type TMediaVideos } from '@/schema & types/tmdb'

export default async function MovieMediaSection({ movie_id }: { movie_id: string }) {
  const results = await Promise.all([TMDBFetch<TMediaImages>(`/movie/${movie_id}/images`), TMDBFetch<TMediaVideos>(`/movie/${movie_id}/videos`)])

  return <MediaMediasSection results={results} />
}
