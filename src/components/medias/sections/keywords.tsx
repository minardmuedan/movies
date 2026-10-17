import { ButtonLink } from '@/components/ui/button'
import { type TGenre } from '@/types/tmdb'

export default function MediaKeywordsSection({ keywords }: { keywords: TGenre[] }) {
  return (
    <section className="shrink-0 lg:basis-2xs">
      <h3 className="hidden lg:block">Keywords</h3>

      <ul className="flex flex-wrap justify-center gap-2 lg:justify-start">
        {keywords.map((keyword) => (
          <li key={keyword.id}>
            <ButtonLink href={`/keyword/${keyword.id}`} size="sm" variant="accentMuted">
              {keyword.name}
            </ButtonLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
