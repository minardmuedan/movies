import { ButtonLink } from '@/components/ui/button'
import { EmptyFallback, ErrorFallback } from '@/components/ui/empty-error'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovieKeywords, TTvKeywords } from '@/schema & types/tmdb'
import { Suspense } from 'react'
import type { SectionProps } from './helpers'
import { Skeleton } from '@/components/ui/skeleton'

export default function MediaKeywordsSection(props: SectionProps) {
  return (
    <section className="shrink-0 lg:basis-2xs">
      <h3 className="max-lg:sr-only">Keywords</h3>

      <Suspense fallback={<LoadingFallback />}>
        <Data {...props} />
      </Suspense>
    </section>
  )
}

async function Data({ media, id }: SectionProps) {
  const result = await TMDBFetch<TMovieKeywords | TTvKeywords>(`/${media}/${id}/keywords`, 'details')

  if (!result.isSuccess) return <ErrorFallback message={result.message} />
  if (!('keywords' in result.data) && !('results' in result.data)) return <EmptyFallback />

  const results = 'results' in result.data ? result.data.results : result.data.keywords
  return (
    <ul className="flex flex-wrap justify-center gap-2 lg:justify-start">
      {results.map(({ id, name }) => (
        <li key={id}>
          <ButtonLink href={`/${media == 'tv' ? 'tv-shows' : 'movies'}/?keywords=${id}-${name}`} size="sm" variant="accentMuted">
            {name}
          </ButtonLink>
        </li>
      ))}
    </ul>
  )
}

function LoadingFallback() {
  return (
    <ul className="flex flex-wrap justify-center gap-2 lg:justify-start">
      {[70, 62, 118, 108, 91, 81, 128].map((width, i) => (
        <li key={i}>
          <Skeleton style={{ width }} className="h-9" />
        </li>
      ))}
    </ul>
  )
}
