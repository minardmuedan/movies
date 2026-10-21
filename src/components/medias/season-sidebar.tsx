'use client'

import type { TTvSeason } from '@/types/tmdb'
import { cn } from 'cn'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import TMDBImage from '../image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { ScrollArea } from '../ui/scroll-area'
import { Button } from '../ui/button'

type Props = { show_id: string; seasons: TTvSeason[] }

export default function SeasonSidebar({ show_id, seasons, showName }: Props & { showName: string }) {
  const { season_number } = useParams<{ season_number?: string }>()
  const [open, setOpen] = useState(false)
  const activeSeason = Number(season_number)

  useEffect(() => {
    if (open) {
      const unopen = () => setOpen(false)
      unopen()
    }
  }, [season_number])

  return (
    <>
      <aside className="sticky top-25 hidden h-fit w-72 lg:block">
        <SeasonList show_id={show_id} seasons={seasons} />
      </aside>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button variant="ghost" />} className="lg:hidden">
          <MenuIcon />
          <div>Season {activeSeason}</div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{showName} Seasons</DialogTitle>
          </DialogHeader>

          <SeasonList show_id={show_id} seasons={seasons} isDialog className="px-2" />
        </DialogContent>
      </Dialog>
    </>
  )
}

function SeasonList({ show_id, seasons, isDialog, className }: Props & { isDialog?: true; className?: string }) {
  const { season_number } = useParams<{ season_number?: string }>()
  const activeSeason = Number(season_number)

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
      const scrollFn = () => list.scrollTo({ top: itemTop - list.clientHeight / 2 + item.clientHeight / 2, behavior: 'smooth' })
      if (isDialog) setTimeout(scrollFn, 100)
      else scrollFn()
    }
  }, [activeSeason])

  return (
    <ScrollArea ref={listRef} className={cn('max-h-[calc(100svh-7.25rem)] pr-4', className)}>
      <nav className="p-1">
        <ul className="space-y-3">
          {seasons.map((season, i) => {
            const isActive = activeSeason == season.season_number

            return (
              <li key={i}>
                <Link
                  href={`/tv/${show_id}/season/${season.season_number}`}
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
