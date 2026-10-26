'use client'

import { useEffect, useState } from 'react'
import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'

type Props = {
  tmdbId: number | string
  type?: 'movie' | 'tv'
  title: string
  year?: string | number
  className?: string
  children?: React.ReactNode
}

type Server = {
  name: string
  url: (p: { id: number | string; type: 'movie' | 'tv'; season: number; episode: number }) => string
}

export const SERVERS: Server[] = [
  {
    name: 'VidSrc',
    url: ({ id, type, season, episode }) =>
      type === 'tv' ? `https://vidsrc.to/embed/tv/${id}/${season}/${episode}` : `https://vidsrc.to/embed/movie/${id}`,
  },
  {
    name: 'VidCore',
    url: ({ id, type, season, episode }) =>
      type === 'tv' ? `https://vidcore.org/embed/tv/${id}/${season}/${episode}` : `https://vidcore.org/embed/movie/${id}`,
  },
]

export default function WatchDrawer({ tmdbId, type = 'movie', title, year, className }: Props) {
  const [open, setOpen] = useState(false)
  const [serverIdx, setServerIdx] = useState(0)
  const [season, setSeason] = useState(1)
  const [episode, setEpisode] = useState(1)
  const [loading, setLoading] = useState(true)

  const src = SERVERS[serverIdx].url({ id: tmdbId, type, season, episode })
  useEffect(() => setLoading(true), [src])

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger render={<Button className={className} />}>
        <Play className="mr-2 h-4 w-4 fill-current" /> Watch Now
      </DrawerTrigger>

      <DrawerContent className="mx-auto max-h-[94vh] w-full md:max-w-4xl">
        <DrawerHeader className="text-left">
          <DrawerTitle className="truncate">{title}</DrawerTitle>
          <DrawerDescription>{[year, type === 'tv' ? 'Series' : 'Movie'].filter(Boolean).join(' · ')}</DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-4 pb-6">
          {/* player: mounted only while open so playback stops on close */}
          <div className="relative aspect-video overflow-hidden rounded-xl border bg-black">
            {open && (
              <iframe
                key={src}
                src={src}
                title={title}
                allowFullScreen
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                referrerPolicy="origin"
                onLoad={() => setLoading(false)}
                className="absolute inset-0 h-full w-full border-0"
              />
            )}
            {open && loading && (
              <div className="text-muted-foreground pointer-events-none absolute inset-0 grid place-items-center text-sm">Loading player…</div>
            )}
          </div>

          {type === 'tv' && (
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <label className="flex items-center gap-2">
                Season
                <Input type="number" min={1} value={season} onChange={(e) => setSeason(Math.max(1, +e.target.value || 1))} className="w-20" />
              </label>
              <label className="flex items-center gap-2">
                Episode
                <Input type="number" min={1} value={episode} onChange={(e) => setEpisode(Math.max(1, +e.target.value || 1))} className="w-20" />
              </label>
            </div>
          )}

          <div>
            <p className="text-muted-foreground mb-2 text-xs tracking-wider uppercase">Servers</p>
            <div className="flex flex-wrap gap-2">
              {SERVERS.map((s, i) => (
                <Button
                  key={s.name}
                  size="sm"
                  variant={i === serverIdx ? 'default' : 'outline'}
                  onClick={() => setServerIdx(i)}
                  className="rounded-full px-4"
                >
                  {s.name}
                </Button>
              ))}
            </div>
            <p className="text-muted-foreground mt-3 text-xs">Nothing playing? Try another server.</p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
