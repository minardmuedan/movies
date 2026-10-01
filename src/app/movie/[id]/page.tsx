import MovieCredits from './sections/credits'
import MovieHero from './sections/hero'
import MovieMedia from './sections/media'
import MovieReviews from './sections/reviews'

export default async function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <main className="[&_h3]:[&_span]:xs-muted flex-1 space-y-20 overflow-x-hidden [&_h3]:mb-6 [&_h3]:text-xl">
      <MovieHero id={id} />
      <MovieCredits id={id} />
      <MovieReviews id={id} />
      <MovieMedia id={id} />
    </main>
  )
}
