import MediaCreditsSection from '@/details-sections/credits'
import { MediaSection } from '@/details-sections/helpers'
import MediaHeroSection from '@/details-sections/hero'
import MediaKeywordsSection from '@/details-sections/keywords'
import MediaMediasSection from '@/details-sections/media'
import MediaRecommendationsSection from '@/details-sections/recommendations'
import MediaReviewsSection from '@/details-sections/reviews'
import MediaSimilarSection from '@/details-sections/similar'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovieDetails } from '@/schema & types/tmdb'

export async function generateMetadata({ params }: PageProps<'/movie/[movie_id]'>) {
  const { movie_id } = await params
  const result = await TMDBFetch<TMovieDetails>(`/movie/${movie_id}`, 'details')
  return { title: result.isSuccess ? result.data.title : 'Movie details', description: 'Movie Details' }
}

export default function MovieDetailsPage({ params }: PageProps<'/movie/[movie_id]'>) {
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
