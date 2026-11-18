import { ButtonLink } from '@/components/ui/button'
import { Undo2Icon } from 'lucide-react'
import TvSeasonsSidebar from './sidebar'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function TvSeasonDetailsLayout({ children, params }: LayoutProps<'/tv/[show_id]/season'>) {
  const promisedShowId = params.then((p) => p.show_id)

  return (
    <>
      <Suspense fallback={<Skeleton className="h-9 w-40.25" />}>
        <BackButton promisedShowId={promisedShowId} />
      </Suspense>

      <div className="flex flex-col items-start gap-12 pt-2 lg:flex-row lg:gap-6">
        <TvSeasonsSidebar promisedShowId={promisedShowId} />

        {children}
      </div>
    </>
  )
}

async function BackButton({ promisedShowId }: { promisedShowId: Promise<string> }) {
  const showId = await promisedShowId
  return (
    <ButtonLink variant="link" href={`/tv/${showId}`} className="top-14 lg:sticky">
      <Undo2Icon />
      Back to Overview
    </ButtonLink>
  )
}
