import BackButton from '@/components/back'
import TvSeasonsSidebar from './sidebar'

type Props = { params: Promise<{ id: string; season: string }>; children: React.ReactNode }

export default async function TvSeasonDetailsLayout({ params, children }: Props) {
  const { id } = await params

  return (
    <>
      <BackButton className="sticky top-14" />

      <div className="flex flex-col items-start gap-6 pt-2 lg:flex-row">
        <TvSeasonsSidebar id={id} />

        {children}
      </div>
    </>
  )
}
