import { ButtonLink } from '@/components/ui/button'
import { Undo2Icon } from 'lucide-react'
import TvSeasonsSidebar from './sidebar'

export default async function TvSeasonDetailsLayout({ params, children }: { params: Promise<{ show_id: string }>; children: React.ReactNode }) {
  const { show_id } = await params

  return (
    <>
      <ButtonLink variant="link" href={`/tv/${show_id}`} className="top-14 lg:sticky">
        <Undo2Icon />
        Back to Overview
      </ButtonLink>

      <div className="flex flex-col items-start gap-12 pt-2 lg:flex-row lg:gap-6">
        <TvSeasonsSidebar show_id={show_id} />

        {children}
      </div>
    </>
  )
}
