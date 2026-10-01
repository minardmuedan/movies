import { ButtonLink } from '@/components/ui/button'
import { TMDBFetch } from '@/lib/fetcher'
import { type TKeywords } from '@/types/tmdb'

export default async function MovieKeywords({ id }: { id: string }) {
  const { keywords } = await TMDBFetch<TKeywords>(`https://api.themoviedb.org/3/movie/${id}/keywords`)

  return (
    <section className="basis-2xs">
      <h3>Keywords</h3>

      <ul className="flex flex-wrap gap-1">
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
