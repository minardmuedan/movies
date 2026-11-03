import MediaReviewsSection from '@/components/medias/sections/reviews'
import { TMDBFetch } from '@/lib/fetcher'
import { type TMediaReviews } from '@/schema & types/tmdb'

export default async function TvReviewsSection({ show_id }: { show_id: string }) {
  return <MediaReviewsSection media="tv" mediaId={show_id} result={await TMDBFetch<TMediaReviews>(`/tv/${show_id}/reviews`)} />
}
