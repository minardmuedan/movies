import BackButton from '@/components/back'
import { MediaSection, MediaSectionProvider, MediaSectionSideNav } from '@/components/medias/sections/helpers'
import TvCreditsSection from './sections/credits'
import TvHeroSection from './sections/hero'
import TvKeywordsSection from './sections/keywords'
import TvMediaSection from './sections/media'
import TvRecommendationsSection from './sections/recommendations'
import TvReviewsSection from './sections/reviews'
import TvSeasonsSection from './sections/seasons'
import TvSimilarSection from './sections/similar'

export default async function TvDetailsPage({ params }: { params: Promise<{ show_id: string }> }) {
  const { show_id } = await params

  return (
    <>
      <BackButton className="md:sticky md:top-14" />

      <div className="mt-60 flex gap-6">
        <MediaSectionProvider sections={['Details', 'Seasons', 'Credits', 'Media', 'Reviews_Keywords', 'Similar', 'Recommendations']}>
          <MediaSectionSideNav />

          <main className="[&_h3]:heading-title flex-1 space-y-28 overflow-x-hidden">
            <TvHeroSection show_id={show_id} />
            <TvSeasonsSection show_id={show_id} />
            <TvCreditsSection show_id={show_id} />
            <TvMediaSection show_id={show_id} />

            <MediaSection as="div" section="Reviews_Keywords" className="flex flex-col gap-20 lg:flex-row lg:gap-6">
              <TvReviewsSection show_id={show_id} />
              <TvKeywordsSection show_id={show_id} />
            </MediaSection>

            <TvSimilarSection show_id={show_id} />
            <TvRecommendationsSection show_id={show_id} />
          </main>
        </MediaSectionProvider>
      </div>
    </>
  )
}
