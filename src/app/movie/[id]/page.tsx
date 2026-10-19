import { MediaSection } from '@/components/medias/sections/helpers'
import MovieCreditSection from './sections/credits'
import MovieHeroSection from './sections/hero'
import MovieKeywordsSection from './sections/keywords'
import MovieMediaSection from './sections/media'
import MovieRecommendationsSection from './sections/recommendations'
import MovieReviewsSection from './sections/reviews'
import MovieSimilarSection from './sections/similar'

export default async function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <main className="[&_h3]:heading-title flex-1 space-y-28 overflow-x-hidden">
      <MovieHeroSection id={id} />
      <MovieCreditSection id={id} />
      <MovieMediaSection id={id} />

      <MediaSection as="div" section="Reviews_Keywords" className="flex flex-col gap-20 lg:flex-row lg:gap-6">
        <MovieReviewsSection id={id} />
        <MovieKeywordsSection id={id} />
      </MediaSection>

      <MovieSimilarSection id={id} />
      <MovieRecommendationsSection id={id} />
    </main>
  )
}
