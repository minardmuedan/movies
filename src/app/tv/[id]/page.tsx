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

export default async function TvDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <>
      <BackButton className="md:sticky md:top-14" />

      <div className="mt-60 flex gap-6">
        <MediaSectionProvider sections={['Details', 'Seasons', 'Credits', 'Media', 'Reviews_Keywords', 'Similar', 'Recommendations']}>
          <MediaSectionSideNav />

          <main className="[&_h3]:heading-title flex-1 space-y-28 overflow-x-hidden">
            <TvHeroSection id={id} />
            <TvSeasonsSection id={id} />
            <TvCreditsSection id={id} />
            <TvMediaSection id={id} />

            <MediaSection as="div" section="Reviews_Keywords" className="flex flex-col gap-20 lg:flex-row lg:gap-6">
              <TvReviewsSection id={id} />
              <TvKeywordsSection id={id} />
            </MediaSection>

            <TvSimilarSection id={id} />
            <TvRecommendationsSection id={id} />
          </main>
        </MediaSectionProvider>
      </div>
    </>
  )
}
