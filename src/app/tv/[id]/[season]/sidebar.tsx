import TMDBImage from '@/components/image'
import { TMDBFetch } from '@/lib/fetcher'
import type { TTvDetails } from '@/types/tmdb'
import Link from 'next/link'

export default async function TvSeasonsSidebar({ id, activeSeason }: { id: string; activeSeason: number }) {
  const result = await TMDBFetch<TTvDetails>(`/tv/${id}`)

  if (!result.isSuccess) return <p>error</p>
  return (
    <aside className="w-80">
      <nav>
        <ul className="space-y-3">
          {result.data.seasons.map((season, i) => (
            <li key={i}>
              <Link
                href={`/tv/${id}/${season.season_number}`}
                className={`accent-muted bg-background flex items-center gap-2 rounded-lg p-2 ${activeSeason == season.season_number ? 'outline-primary bg-primary/30 pointer-events-none border-transparent outline-2' : ''}`}
              >
                <h2 className="text-muted-foreground mr-2 font-medium">
                  <span className="sr-only">Season</span> {season.season_number}
                </h2>

                <TMDBImage type="poster" src={season.poster_path} alt="" className="size-12 rounded" />

                <div className="flex-1">
                  <div className="line-clamp-1 text-sm text-ellipsis">{season.name}</div>
                  <div className="xs-muted">{season.episode_count} episodes</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
