import MovieCredits from './sections/credits'
import MovieHero from './sections/hero'
import MovieKeywords from './sections/keywords'
import MovieMedia from './sections/media'
import MovieRecommendations from './sections/recommendations'
import MovieReviews from './sections/reviews'
import MovieSimilar from './sections/similar'

export default async function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <main className="[&_h3]:[&_span]:xs-muted [&_h3]:text-muted-foreground flex-1 space-y-28 overflow-x-hidden [&_h3]:text-xl [&_h3:not([class*='mb-'])]:mb-6">
      <MovieHero id={id} />
      <MovieCredits id={id} />
      <div className="flex gap-6">
        <MovieReviews id={id} />
        <MovieKeywords id={id} />
      </div>
      <MovieMedia id={id} />
      <MovieSimilar id={id} />
      <MovieRecommendations id={id} />
    </main>
  )
}
