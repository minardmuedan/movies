import MediaKeywordsSection from '@/components/medias/sections/keywords'
import { TMDBFetch } from '@/lib/fetcher'
import { type TMovieKeywords } from '@/schema & types/tmdb'

export default async function MovieKeywordsSection({ movie_id }: { movie_id: string }) {
  return <MediaKeywordsSection type="movies" result={await TMDBFetch<TMovieKeywords>(`/movie/${movie_id}/keywords`)} />
}
