'use client'

import type { TTvSeason } from '@/types/tmdb'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import TMDBImage from '../image'
import { ScrollArea } from '../ui/scroll-area'

export default function SeasonSidebar({ showId, seasons }: { showId: string; seasons: TTvSeason[] }) {
  const { season: activeSeason } = useParams<{ season?: string }>()
  const listRef = useRef<HTMLDivElement | null>(null)
  const activeRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    const list = listRef.current
    const item = activeRef.current
    if (!list || !item) return

    const itemTop = item.offsetTop
    const itemBottom = itemTop + item.clientHeight
    const viewTop = list.scrollTop
    const viewBottom = viewTop + list.clientHeight

    if (itemTop < viewTop || itemBottom > viewBottom) {
      list.scrollTo({
        top: itemTop - list.clientHeight / 2 + item.clientHeight / 2,
        behavior: 'smooth',
      })
    }
  }, [activeSeason])

  return (
    <aside className="sticky top-25 hidden h-fit lg:block">
      <ScrollArea ref={listRef} className="max-h-[calc(100svh-7.25rem)] w-72 pr-4">
        <nav className="p-1">
          <ul className="space-y-3">
            {seasons.map((season, i) => {
              const isActive = Number(activeSeason) == season.season_number

              return (
                <li key={i}>
                  <Link
                    href={`/tv/${showId}/${season.season_number}`}
                    className={`accent-muted bg-background flex items-center gap-2 rounded-lg p-2 ${isActive ? 'outline-primary bg-primary/30 pointer-events-none border-transparent outline-2' : ''}`}
                    ref={isActive ? activeRef : null}
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
              )
            })}
          </ul>
        </nav>
      </ScrollArea>
    </aside>
  )
}
