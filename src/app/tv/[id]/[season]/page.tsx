import BackButton from '@/components/back'
import { TMDBFetch } from '@/lib/fetcher'
import { TTVSeasonDetails } from '@/types/tmdb'
import TvSeasonsSidebar from './sidebar'

export default async function TvSeasonDetails({ params }: { params: Promise<{ id: string; season: string }> }) {
  const { id, season } = await params

  const result = await TMDBFetch<TTVSeasonDetails>(`/tv/${id}/season/${season}`)
  if (!result.isSuccess) return <p>error</p>

  return (
    <>
      <BackButton />

      <div className="flex gap-10">
        <TvSeasonsSidebar id={id} activeSeason={Number(season)} />

        <section className="flex-1 overflow-hidden border">
          <h1 className="text-2xl">{result.data.name}</h1>
          <p className="sm-muted">{result.data.overview}</p>
        </section>
      </div>
    </>
  )
}
