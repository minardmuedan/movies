import PersonCreditsClient from '@/components/person-credits'
import { ErrorFallback } from '@/components/ui/empty-error'
import { Skeleton } from '@/components/ui/skeleton'
import { TMDBFetch } from '@/lib/fetcher'
import type { TPersonCombinedCredits } from '@/schema & types/tmdb'
import { Suspense } from 'react'

export default function PersonCreditsSection({ person_id }: { person_id: string }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Data person_id={person_id} />
    </Suspense>
  )
}

async function Data({ person_id }: { person_id: string }) {
  const result = await TMDBFetch<TPersonCombinedCredits>(`/person/${person_id}/combined_credits`)

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

function LoadingFallback() {
  return (
    <section className="flex gap-14">
      <aside className="sticky top-16 h-fit min-w-52 shrink-0 max-md:hidden">
        <h2>Department</h2>

        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-11.5 w-full" />
          ))}
        </div>
      </aside>

      <div className="flex-1">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="mb-0">Credits</h2>
          <Skeleton className="h-9 w-20 md:hidden" />
        </div>

        <ul className="space-y-3">
          {[...Array(10)].map((_, i) => (
            <li key={i} className="flex h-40 gap-3 rounded-lg border p-2">
              <Skeleton className="aspect-2/3 h-full shrink-0" />

              <div className="max-w-175 flex-1">
                <Skeleton className="mb-1 h-4 w-28" />
                <Skeleton className="h-3 w-16" />

                <Skeleton className="mt-4 mb-1 h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
