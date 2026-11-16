import MediaCreditsSection from '@/details-sections/credits'
import { MediaSection } from '@/details-sections/helpers'
import MediaHeroSection from '@/details-sections/hero'
import MediaKeywordsSection from '@/details-sections/keywords'
import MediaMediasSection from '@/details-sections/media'
import MediaRecommendationsSection from '@/details-sections/recommendations'
import MediaReviewsSection from '@/details-sections/reviews'
import TvSeasonsSection from '@/details-sections/seasons'
import MediaSimilarSection from '@/details-sections/similar'

type Params = { params: Promise<{ show_id: string }> }

export default async function TvDetailsPage({ params }: Params) {
  const promisedId = params.then((p) => p.show_id)
  return (
    <main className="[&_h3]:heading-title flex-1 space-y-28 overflow-x-hidden">
      <MediaHeroSection media="tv" promisedId={promisedId} />
      <TvSeasonsSection promisedId={promisedId} />
      <MediaCreditsSection media="tv" promisedId={promisedId} />
      <MediaMediasSection media="tv" promisedId={promisedId} />
      <MediaSection as="div" section="Reviews_Keywords" className="flex flex-col gap-20 lg:flex-row lg:gap-6">
        <MediaReviewsSection media="tv" promisedId={promisedId} />
        <MediaKeywordsSection media="tv" promisedId={promisedId} />
      </MediaSection>
      <MediaSimilarSection media="tv" promisedId={promisedId} />
      <MediaRecommendationsSection media="tv" promisedId={promisedId} />
    </main>
  )
}
