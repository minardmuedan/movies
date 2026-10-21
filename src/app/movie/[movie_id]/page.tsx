import { MediaSection } from '@/components/medias/sections/helpers'
import MovieCreditSection from './sections/credits'
import MovieHeroSection from './sections/hero'
import MovieKeywordsSection from './sections/keywords'
import MovieMediaSection from './sections/media'
import MovieRecommendationsSection from './sections/recommendations'
import MovieReviewsSection from './sections/reviews'
import MovieSimilarSection from './sections/similar'

export default async function MovieDetailsPage({ params }: { params: Promise<{ movie_id: string }> }) {
  const { movie_id } = await params
  return (
    <main className="[&_h3]:heading-title flex-1 space-y-28 overflow-x-hidden">
      <MovieHeroSection movie_id={movie_id} />
      <MovieCreditSection movie_id={movie_id} />
      <MovieMediaSection movie_id={movie_id} />

      <MediaSection as="div" section="Reviews_Keywords" className="flex flex-col gap-20 lg:flex-row lg:gap-6">
        <MovieReviewsSection movie_id={movie_id} />
        <MovieKeywordsSection movie_id={movie_id} />
      </MediaSection>

      <MovieSimilarSection movie_id={movie_id} />
      <MovieRecommendationsSection movie_id={movie_id} />
    </main>
  )
}
