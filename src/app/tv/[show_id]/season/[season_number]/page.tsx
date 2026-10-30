import TMDBImage from '@/components/image'
import { EpisodeDialogTrigger, EpisodesDialog, EpisodesDialogContent } from '@/components/medias/episodes-dialog'
import { TMDBFetch } from '@/lib/fetcher'
import { TTVSeasonDetails } from '@/schema & types/tmdb'

export default async function TvSeasonDetailsPage({ params }: { params: Promise<{ show_id: string; season_number: string }> }) {
  const { show_id, season_number } = await params

  const result = await TMDBFetch<TTVSeasonDetails>(`/tv/${show_id}/season/${season_number}`)
  if (!result.isSuccess) return <p>error</p>

  const season = result.data

  return (
    <div className="flex-1 py-1">
      <section className="mb-20 text-center">
        <TMDBImage type="poster" src={result.data.poster_path} alt="" className="mx-auto mb-6 aspect-2/3 w-52 rounded-md" />
        <span className="xs-muted">Season {season.season_number}</span>
        <h1 className="text-3xl font-semibold">{season.name}</h1>
        {season.overview && <p className="sm-muted mt-2">{season.overview}</p>}
      </section>

      <section>
        <h3 className="heading-title">
          Episodes <span>{season.episodes.length}</span>
        </h3>

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
      </section>
    </div>
  )
}
