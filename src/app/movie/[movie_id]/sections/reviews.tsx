import MediaReviewsSection from '@/components/medias/sections/reviews'
import { TMDBFetch } from '@/lib/fetcher'
import { type TMediaReviews } from '@/types/tmdb'

export default async function MovieReviewsSection({ movie_id }: { movie_id: string }) {
  const result = await TMDBFetch<TMediaReviews>(`/movie/${movie_id}/reviews`)

  if (!result.isSuccess) return <p>error</p>

  return <MediaReviewsSection media="movie" mediaId={movie_id} reviews={result.data} />
}
