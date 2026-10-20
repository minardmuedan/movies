'use client'

import type { TTvSeason } from '@/types/tmdb'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import TMDBImage from '../image'
import { ScrollArea } from '../ui/scroll-area'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { cn } from 'cn'
import { MenuIcon } from 'lucide-react'

type Props = { showId: string; seasons: TTvSeason[] }

export default function SeasonSidebar({ showId, seasons }: Props) {
  const { season } = useParams<{ season?: string }>()
  const activeSeason = Number(season)

  return (
    <>
      <aside className="sticky top-25 hidden h-fit w-72 lg:block">
        <SeasonList showId={showId} seasons={seasons} />
      </aside>

      <Dialog>
        <DialogTrigger className="flex items-center gap-2 text-sm">
          <MenuIcon />
          <div>Season {activeSeason}</div>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Seasons</DialogTitle>
          </DialogHeader>

          <SeasonList showId={showId} seasons={seasons} className="px-2" />
        </DialogContent>
      </Dialog>
    </>
  )
}

function SeasonList({ showId, seasons, className }: Props & { className?: string }) {
  const { season } = useParams<{ season?: string }>()
  const activeSeason = Number(season)

  const listRef = useRef<HTMLDivElement | null>(null)

  const activeRef = useCallback((el: HTMLAnchorElement | null) => {
    if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [])

  return (
    <ScrollArea ref={listRef} className={cn('max-h-[calc(100svh-7.25rem)] pr-4', className)}>
      <nav className="p-1">
        <ul className="space-y-3">
          {seasons.map((season, i) => {
            const isActive = activeSeason == season.season_number

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
  )
}
