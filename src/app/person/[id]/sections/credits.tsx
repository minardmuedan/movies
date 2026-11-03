import PersonCreditsClient from '@/components/person-credits'
import { ErrorFallback } from '@/components/ui/empty-error'
import { TMDBFetch } from '@/lib/fetcher'
import type { TPersonCombinedCredits } from '@/schema & types/tmdb'

export default async function PersonCreditsSection({ id }: { id: string }) {
  const result = await TMDBFetch<TPersonCombinedCredits>(`/person/${id}/combined_credits`)

  if (!result.isSuccess)
    return (
      <section>
        <h2>Credits</h2>
        <ErrorFallback message={result.message} />
      </section>
    )

  const media: Record<string, any> = { All: [...result.data.cast, ...result.data.crew], Acting: result.data.cast }
  result.data.crew.map(({ department, ...data }) => (media[department] = media[department] ? [...media[department], data] : [data]))

  return <PersonCreditsClient media={media} />
}
