import TMDBImage from '@/components/image'
import { MediaSection } from '@/components/medias/sections/helpers'
import { Button } from '@/components/ui/button'
import { MovieRating } from '@/components/ui/movie'
import { TMDBFetch } from '@/lib/fetcher'
import type { TTvDetails } from '@/types/tmdb'
import Link from 'next/link'

export default async function TvSeasonsSection({ id }: { id: string }) {
  const result = await TMDBFetch<TTvDetails>(`/tv/${id}`)
  if (!result.isSuccess) return <p>error</p>

  const { seasons } = result.data
  return (
    <MediaSection section="Seasons">
      <h3>
        Seasons <span>{seasons.length}</span>
      </h3>

      <div className="relative">
        <ul className="space-y-3">
          {seasons.slice(0, 4).map((season) => (
            <li key={season.id}>
              <Link href={`/tv/${id}/${season.season_number}`} className="accent-muted flex h-40 gap-3 rounded-md px-2 py-3">
                <div className="text-muted-foreground/50 hidden w-12 self-center text-center text-2xl font-semibold md:block">
                  {season.season_number}
                </div>

                <TMDBImage type="poster" src={season.poster_path} alt="" className="aspect-2/3 h-full rounded" />

                <div className="flex flex-1 flex-col py-1 text-sm">
                  <div className="mb-2">{season.name}</div>
                  <p className="xs-muted md:sm-muted line-clamp-3 text-ellipsis">{season.overview}</p>

                  <div className="text-muted-foreground mt-auto">{season.episode_count} episodes</div>
                </div>

                <div className="ml-auto space-y-2 text-end">
                  {season.air_date && <div className="xs-muted">{season.air_date.split('-')[0]}</div>}
                  <MovieRating average={season.vote_average} />
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {seasons.length > 4 && (
          <div className="from-background to-background/0 absolute bottom-0 left-0 z-20 flex h-40 w-full items-end justify-center bg-linear-to-t from-40%">
            <Button variant="link">View Full Seasons</Button>
          </div>
        )}
      </div>
    </MediaSection>
  )
}
