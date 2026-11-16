import { ButtonLink } from '@/components/ui/button'
import { Undo2Icon } from 'lucide-react'
import TvSeasonsSidebar from './sidebar'

export default function TvSeasonDetailsLayout({ children, params }: { params: Promise<{ show_id: string }>; children: React.ReactNode }) {
  const promisedShowId = params.then((p) => p.show_id)

  return (
    <>
      <BackButton promisedShowId={promisedShowId} />

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
