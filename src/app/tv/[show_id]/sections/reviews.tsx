import MediaReviewsSection from '@/components/medias/sections/reviews'
import { TMDBFetch } from '@/lib/fetcher'
import { type TMediaReviews } from '@/types/tmdb'

export default async function TvReviewsSection({ show_id }: { show_id: string }) {
  const result = await TMDBFetch<TMediaReviews>(`/tv/${show_id}/reviews`)
  if (!result.isSuccess) return <p>error</p>
  return <MediaReviewsSection media="tv" mediaId={show_id} reviews={result.data} />
}
