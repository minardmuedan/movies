import MediaCreditsSection from '@/details-sections/credits'
import { MediaSection } from '@/details-sections/helpers'
import MediaHeroSection from '@/details-sections/hero'
import MediaKeywordsSection from '@/details-sections/keywords'
import MediaMediasSection from '@/details-sections/media'
import MediaRecommendationsSection from '@/details-sections/recommendations'
import MediaReviewsSection from '@/details-sections/reviews'
import TvSeasonsSection from '@/details-sections/seasons'
import MediaSimilarSection from '@/details-sections/similar'
import { TMDBFetch } from '@/lib/fetcher'
import type { TTvDetails } from '@/schema & types/tmdb'

export async function generateMetadata({ params }: PageProps<'/tv/[show_id]'>) {
  const { show_id } = await params
  const result = await TMDBFetch<TTvDetails>(`/tv/${show_id}`, 'details')
  return { title: result.isSuccess ? result.data.name : 'Tv Show details', description: 'Tv Show Details' }
}

export default async function TvDetailsPage({ params }: PageProps<'/tv/[show_id]'>) {
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
