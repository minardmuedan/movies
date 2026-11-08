import MediaCreditsSection from '@/details-sections/credits'
import { MediaSection } from '@/details-sections/helpers'
import MediaHeroSection from '@/details-sections/hero'
import MediaKeywordsSection from '@/details-sections/keywords'
import MediaMediasSection from '@/details-sections/media'
import MediaRecommendationsSection from '@/details-sections/recommendations'
import MediaReviewsSection from '@/details-sections/reviews'
import TvSeasonsSection from '@/details-sections/seasons'
import MediaSimilarSection from '@/details-sections/similar'
import { Suspense } from 'react'

type Params = { params: Promise<{ show_id: string }> }

export default async function TvDetailsPage({ params }: Params) {
  return (
    <Suspense fallback={null}>
      <Data params={params} />
    </Suspense>
  )
}

async function Data({ params }: Params) {
  const { show_id } = await params

  return (
    <main className="[&_h3]:heading-title flex-1 space-y-28 overflow-x-hidden">
      <MediaHeroSection media="tv" id={show_id} />
      <TvSeasonsSection id={show_id} />
      <MediaCreditsSection media="tv" id={show_id} />
      <MediaMediasSection media="tv" id={show_id} />
      <MediaSection as="div" section="Reviews_Keywords" className="flex flex-col gap-20 lg:flex-row lg:gap-6">
        <MediaReviewsSection media="tv" id={show_id} />
        <MediaKeywordsSection media="tv" id={show_id} />
      </MediaSection>
      <MediaSimilarSection media="tv" id={show_id} />
      <MediaRecommendationsSection media="tv" id={show_id} />
    </main>
  )
}
