import MediaCreditsSection from '@/details-sections/credits'
import { MediaSection } from '@/details-sections/helpers'
import MediaHeroSection from '@/details-sections/hero'
import MediaKeywordsSection from '@/details-sections/keywords'
import MediaMediasSection from '@/details-sections/media'
import MediaRecommendationsSection from '@/details-sections/recommendations'
import MediaReviewsSection from '@/details-sections/reviews'
import MediaSimilarSection from '@/details-sections/similar'

type Params = { params: Promise<{ movie_id: string }> }

export default function MovieDetailsPage({ params }: Params) {
  const promisedId = params.then((p) => p.movie_id)

  return (
    <main className="[&_h3]:heading-title flex-1 space-y-28 overflow-x-hidden">
      <MediaHeroSection media="movie" promisedId={promisedId} />
      <MediaCreditsSection media="movie" promisedId={promisedId} />
      <MediaSection as="div" section="Reviews_Keywords" className="flex flex-col gap-20 lg:flex-row lg:gap-6">
        <MediaReviewsSection media="movie" promisedId={promisedId} />
        <MediaKeywordsSection media="movie" promisedId={promisedId} />
      </MediaSection>
      <MediaMediasSection media="movie" promisedId={promisedId} />
      <MediaSimilarSection media="movie" promisedId={promisedId} />
      <MediaRecommendationsSection media="movie" promisedId={promisedId} />
    </main>
  )
}
