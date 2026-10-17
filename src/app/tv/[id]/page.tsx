import { MediaSection } from '@/components/medias/sections/helpers'
import TvCreditsSection from './sections/credits'
import TvHeroSection from './sections/hero'
import TvKeywordsSection from './sections/keywords'
import TvRecommendationsSection from './sections/recommendations'
import TvReviewsSection from './sections/reviews'
import TvSeasonsSection from './sections/seasons'
import TvSimilarSection from './sections/similar'
import TvMediaSection from './sections/media'

export default async function TvDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <main className="[&_h3]:[&_span]:xs-muted [&_h3]:text-muted-foreground flex-1 space-y-28 overflow-x-hidden [&_h3]:text-xl [&_h3:not([class*='mb-'])]:mb-6">
      <TvHeroSection id={id} />
      <TvCreditsSection id={id} />
      <TvSeasonsSection id={id} />
      <TvMediaSection id={id} />

      <MediaSection as="div" section="Reviews_Keywords" className="flex flex-col gap-20 lg:flex-row lg:gap-6">
        <TvReviewsSection id={id} />
        <TvKeywordsSection id={id} />
      </MediaSection>

      <TvSimilarSection id={id} />
      <TvRecommendationsSection id={id} />
    </main>
  )
}
