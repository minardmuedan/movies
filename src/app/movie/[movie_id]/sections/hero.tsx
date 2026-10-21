import MediaHeroSection from '@/components/medias/sections/hero'
import { TMDBFetch } from '@/lib/fetcher'
import { type TMovieDetails } from '@/types/tmdb'

export default async function MovieHeroSection({ movie_id }: { movie_id: string }) {
  const result = await TMDBFetch<TMovieDetails>(`/movie/${movie_id}`)

  if (!result.isSuccess) return <p>error</p>

  return <MediaHeroSection media={result.data} />
}
