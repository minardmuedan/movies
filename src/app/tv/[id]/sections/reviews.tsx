import MediaReviewsSection from '@/components/medias/sections/reviews'
import { TMDBFetch } from '@/lib/fetcher'
import { type TMediaReviews } from '@/types/tmdb'

export default async function TvReviewsSection({ id }: { id: string }) {
  const result = await TMDBFetch<TMediaReviews>(`/tv/${id}/reviews`)
  if (!result.isSuccess) return <p>error</p>
  return <MediaReviewsSection reviews={result.data} />
}
