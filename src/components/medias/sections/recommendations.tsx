import type { FetchReturn } from '@/lib/fetcher'
import type { TMovies, TTvShows } from '@/schema & types/tmdb'
import MediaCard from '../media-card'
import { MediaSection } from './helpers'
import { EmptyFallback, ErrorFallback } from '@/components/ui/empty-error'

export default function MediaRecommendationsSection({ result }: { result: FetchReturn<TMovies | TTvShows> }) {
  return (
    <MediaSection section="Recommendations">
      <h3>Recommended For You</h3>

      {!result.isSuccess ? (
        <ErrorFallback message={result.message} className="h-120" />
      ) : result.data.results.length < 1 ? (
        <EmptyFallback className="h-60" />
      ) : (
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
      )}
    </MediaSection>
  )
}
