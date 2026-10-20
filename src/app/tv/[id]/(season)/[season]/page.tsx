import TMDBImage from '@/components/image'
import { MovieRating } from '@/components/ui/movie'
import { TMDBFetch } from '@/lib/fetcher'
import { TTVSeasonDetails } from '@/types/tmdb'

export default async function TvSeasonDetailsPage({ params }: { params: Promise<{ id: string; season: string }> }) {
  const { id, season: seasonNumber } = await params

  const result = await TMDBFetch<TTVSeasonDetails>(`/tv/${id}/season/${seasonNumber}`)
  if (!result.isSuccess) return <p>error</p>

  const season = result.data

  return (
    <div className="flex-1 py-1">
      <section className="mb-20 text-center">
        <h1 className="text-3xl font-semibold">{season.name}</h1>
        {season.overview && <p className="sm-muted mt-2">{season.overview}</p>}
      </section>

      <section>
        <h3 className="heading-title">
          Episodes <span>{season.episodes.length}</span>
        </h3>

        <ul className="space-y-3">
          {season.episodes.map((episode, i) => (
            <li key={i} className="accent-muted flex h-24 rounded-sm py-2 text-sm">
              <div className="my-auto w-10 text-center">{episode.episode_number}</div>

              <TMDBImage type="poster" src={episode.still_path} alt="" className="aspect-video h-full rounded" />

              <div className="ml-2 flex-1 *:line-clamp-2 *:text-ellipsis">
                {episode.name != String(episode.episode_number) && <div className="mb-2">{episode.name}</div>}
                <div className="xs-muted max-w-175 text-ellipsis">{episode.overview}</div>
              </div>

              <div className="flex flex-col justify-between pr-2 pl-6 text-xs">
                <MovieRating average={episode.vote_average} />
                <span className="text-muted-foreground">{episode.runtime} min</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
