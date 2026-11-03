import MediaHeroSection from '@/components/medias/sections/hero'
import { TMDBFetch } from '@/lib/fetcher'
import { type TMovieDetails } from '@/schema & types/tmdb'

export default async function MovieHeroSection({ movie_id }: { movie_id: string }) {
  return <MediaHeroSection result={await TMDBFetch<TMovieDetails>(`/movie/${movie_id}`)} />
}
