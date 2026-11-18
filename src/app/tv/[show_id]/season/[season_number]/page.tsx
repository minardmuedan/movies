import TMDBImage from '@/components/image'
import { EpisodeDialogTrigger, EpisodesDialog, EpisodesDialogContent } from '@/components/medias/episodes-dialog'
import { ErrorFallback, EmptyFallback } from '@/components/ui/empty-error'
import { TMDBFetch } from '@/lib/fetcher'
import { TTVSeasonDetails, type TTvDetails } from '@/schema & types/tmdb'

export async function generateMetadata({ params }: PageProps<'/tv/[show_id]/season/[season_number]'>) {
  const { show_id } = await params
  const result = await TMDBFetch<TTvDetails>(`/tv/${show_id}`, 'details')
  return { title: result.isSuccess ? `${result.data.name} Seasons` : 'Tv Show Season details', description: 'Tv Show Season Details' }
}

export default async function TvSeasonDetailsPage({ params }: PageProps<'/tv/[show_id]/season/[season_number]'>) {
  const { show_id, season_number } = await params

  const result = await TMDBFetch<TTVSeasonDetails>(`/tv/${show_id}/season/${season_number}`, 'details')
  if (!result.isSuccess) return <ErrorFallback message={result.message} className="h-[calc(100dvh-7rem)] w-full" />

  const season = result.data
  return (
    <div className="flex-1 py-1">
      <section className="mb-20 text-center">
        <TMDBImage type="poster" src={result.data.poster_path} alt={season.name} sizes="208px" className="mx-auto mb-6 aspect-2/3 w-52 rounded-md" />
        <span className="xs-muted">Season {season.season_number}</span>
        <h1 className="text-3xl font-semibold">{season.name}</h1>
        {season.overview && <p className="sm-muted mt-2">{season.overview}</p>}
      </section>

      <section>
        <h3 className="heading-title">
          Episodes <span>{season.episodes.length}</span>
        </h3>

        {season.episodes.length < 1 ? (
          <EmptyFallback />
        ) : (
          <EpisodesDialog episodes={season.episodes}>
            <ul className="space-y-3">
              {season.episodes.map((episode, i) => (
                <li key={i}>
                  <EpisodeDialogTrigger episode={episode} />
                </li>
              ))}
            </ul>

            <EpisodesDialogContent />
          </EpisodesDialog>
        )}
      </section>
    </div>
  )
}
