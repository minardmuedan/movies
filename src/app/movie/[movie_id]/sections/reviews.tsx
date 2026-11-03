import MediaReviewsSection from '@/components/medias/sections/reviews'
import { TMDBFetch } from '@/lib/fetcher'
import { type TMediaReviews } from '@/schema & types/tmdb'

export default async function MovieReviewsSection({ movie_id }: { movie_id: string }) {
  return <MediaReviewsSection media="movie" mediaId={movie_id} result={await TMDBFetch<TMediaReviews>(`/movie/${movie_id}/reviews`)} />
}
