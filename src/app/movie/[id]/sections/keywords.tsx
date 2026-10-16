import { ButtonLink } from '@/components/ui/button'
import { TMDBFetch } from '@/lib/fetcher'
import { type TKeywords } from '@/types/tmdb'

export default async function MovieKeywords({ id }: { id: string }) {
  const result = await TMDBFetch<TKeywords>(`/movie/${id}/keywords`)

  if (!result.isSuccess) return <p>error</p>

  const { keywords } = result.data
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
