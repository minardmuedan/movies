import { ButtonLink } from '@/components/ui/button'
import { type TGenre } from '@/schema & types/tmdb'

export default function MediaKeywordsSection({ type, keywords }: { type: 'movies' | 'tv-shows'; keywords: TGenre[] }) {
  return (
    <section className="shrink-0 lg:basis-2xs">
      <h3 className="max-lg:sr-only">Keywords</h3>

      <ul className="flex flex-wrap justify-center gap-2 lg:justify-start">
        {keywords.map(({ id, name }) => (
          <li key={id}>
            <ButtonLink href={`/${type}/?keywords=${id}-${name}`} size="sm" variant="accentMuted">
              {name}
            </ButtonLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
