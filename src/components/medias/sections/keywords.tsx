import { ButtonLink } from '@/components/ui/button'
import { ErrorFallback } from '@/components/ui/empty-error'
import type { FetchReturn } from '@/lib/fetcher'
import { type TGenre, type TMovieKeywords, type TTvKeywords } from '@/schema & types/tmdb'

type Props = { type: 'movies' | 'tv-shows'; result: FetchReturn<TMovieKeywords | TTvKeywords> }
export default function MediaKeywordsSection({ type, result }: Props) {
  return (
    <section className="shrink-0 lg:basis-2xs">
      <h3 className="max-lg:sr-only">Keywords</h3>

      {!result.isSuccess ? (
        <ErrorFallback message={result.message} />
      ) : (
        <ul className="flex flex-wrap justify-center gap-2 lg:justify-start">
          {('keywords' in result.data ? result.data.keywords : result.data.results).map(({ id, name }) => (
            <li key={id}>
              <ButtonLink href={`/${type}/?keywords=${id}-${name}`} size="sm" variant="accentMuted">
                {name}
              </ButtonLink>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
