import MediaCard, { MediaCardsLoadingFallback } from '@/components/medias/media-card'
import { EmptyFallback, ErrorFallback } from '@/components/ui/empty-error'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovies, TTvShows } from '@/schema & types/tmdb'
import { Suspense } from 'react'
import { MediaSection, type SectionProps } from './helpers'

export default function MediaRecommendationsSection(props: SectionProps) {
  return (
    <MediaSection section="Recommendations">
      <h3>Recommended For You</h3>

      <Suspense fallback={<MediaCardsLoadingFallback className="md:grid-cols-3 xl:grid-cols-4" />}>
        <Data {...props} />
      </Suspense>
    </MediaSection>
  )
}
async function Data({ media, id }: SectionProps) {
  const result = await TMDBFetch<TMovies | TTvShows>(`/${media}/${id}/recommendations`, 'details')

  if (!result.isSuccess) return <ErrorFallback message={result.message} className="h-120" />
  if (result.data.results.length < 1) return <EmptyFallback className="h-60" />
  return (
    <ul className="media-card-container md:grid-cols-3 xl:grid-cols-4">
      {result.data.results.map((data) => (
        <li key={data.id}>
          <MediaCard
            data={data}
            imageSizes="(min-width: 1680px) 307px, (min-width: 1280px) calc(21.05vw - 42px), (min-width: 1040px) calc(33.18vw - 112px), (min-width: 640px) calc(33.16vw - 32px), calc(50vw - 30px)"
          />
        </li>
      ))}
    </ul>
  )
}
