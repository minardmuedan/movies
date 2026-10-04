import { ButtonLink } from '@/components/ui/button'
import { TMDBFetch } from '@/lib/fetcher'
import { type TKeywords } from '@/types/tmdb'

export default async function MovieKeywords({ id }: { id: string }) {
  const result = await TMDBFetch<TKeywords>(`/movie/${id}/keywords`)

  if (!result.isSuccess) return <p>error</p>

  const { keywords } = result.data
  return (
    <section className="basis-2xs">
      <h3>Keywords</h3>

      <ul className="flex flex-wrap gap-2">
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
