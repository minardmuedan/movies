import SeasonSidebar from '@/components/medias/season-sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { TMDBFetch } from '@/lib/fetcher'
import type { TTvDetails } from '@/schema & types/tmdb'
import { Suspense } from 'react'

export default function TvSeasonsSidebar({ show_id }: { show_id: string }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Data show_id={show_id} />
    </Suspense>
  )
}

async function Data({ show_id }: { show_id: string }) {
  const result = await TMDBFetch<TTvDetails>(`/tv/${show_id}`)

  if (!result.isSuccess) return
  return <SeasonSidebar show_id={show_id} seasons={result.data.seasons} showName={result.data.name} />
}

function LoadingFallback() {
  return (
    <>
      <aside className="sticky top-25 h-fit w-72 max-lg:hidden">
        <div className="max-h-[calc(100svh-6.75rem)] p-1">
          <ul className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <li key={i} className="bg-background flex items-center gap-2 rounded-lg border p-2">
                <h2 className="text-muted-foreground mr-2 font-medium">
                  <span className="sr-only">Season</span> {i + 1}
                </h2>
                <Skeleton className="size-12 rounded" />

                <div className="flex-1">
                  <Skeleton className="mb-1 h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <Skeleton className="h-9 w-26.75 lg:hidden" />
    </>
  )
}
