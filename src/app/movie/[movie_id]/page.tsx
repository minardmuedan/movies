import MediaCreditsSection from '@/details-sections/credits'
import { MediaSection } from '@/details-sections/helpers'
import MediaHeroSection from '@/details-sections/hero'
import MediaKeywordsSection from '@/details-sections/keywords'
import MediaMediasSection from '@/details-sections/media'
import MediaRecommendationsSection from '@/details-sections/recommendations'
import MediaReviewsSection from '@/details-sections/reviews'
import MediaSimilarSection from '@/details-sections/similar'

export default async function MovieDetailsPage({ params }: { params: Promise<{ movie_id: string }> }) {
  const { movie_id } = await params
  return (
    <main className="[&_h3]:heading-title flex-1 space-y-28 overflow-x-hidden">
      <MediaHeroSection media="movie" id={movie_id} />
      <MediaCreditsSection media="movie" id={movie_id} />
      <MediaSection as="div" section="Reviews_Keywords" className="flex flex-col gap-20 lg:flex-row lg:gap-6">
        <MediaReviewsSection media="movie" id={movie_id} />
        <MediaKeywordsSection media="movie" id={movie_id} />
      </MediaSection>

      <MediaMediasSection media="movie" id={movie_id} />
      {/* <MediaSimilarSection media="movie" id={movie_id} />
      <MediaRecommendationsSection media="movie" id={movie_id} /> */}
    </main>
  )
}
