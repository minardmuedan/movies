'use client'

import { Button, ButtonLink } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useModalHistory } from '@/hooks/use-modal'
import { useTvSeries } from '@/hooks/use-series'
import type { TMovieDetails, TTvDetails } from '@/schema & types/tmdb'
import { PlayIcon } from 'lucide-react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { MediaDetailsList } from './details-list'

const MOVIE_SERVERS: ((id: number) => string)[] = [
  (id) => `https://embed.vidrift.net/embed/movie/${id}?font=Inter`,
  (id) => `https://vidsrc.to/embed/movie/${id}`,
  (id) => `https://vidcore.org/embed/movie/${id}`,
]

const TV_SERVERS: ((id: number, season: number, episode: number) => string)[] = [
  (id, s, e) => `https://embed.vidrift.net/embed/tv/${id}/${s}/${e}?font=Inter`,
  (id, s, e) => `https://vidsrc.to/embed/tv/${id}/${s}/${e}`,
  (id, s, e) => `https://vidcore.org/embed/tv/${id}/${s}/${e}`,
]

export function Watch(media: TMovieDetails | TTvDetails) {
  const [drawerOpen, setDrawerOpen] = useModalHistory()
  const [dialogOpen, setDialogOpen] = useModalHistory()
  const [serverIdx, setServerIdx] = useState(0)

  const title = `Watch ${'name' in media ? media.name : media.title} `
  const src = MOVIE_SERVERS[serverIdx](media.id)

  const WatchContent = () => (
    <div className="mt-6 flex flex-col space-y-12 overflow-y-auto px-2 pb-6 text-center *:mx-auto lg:px-3">
      {'seasons' in media ? (
        <Series media={media} serverIdx={serverIdx} />
      ) : (
        <iframe
          key={src}
          src={src}
          title={media.title}
          allowFullScreen
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          referrerPolicy="origin"
          className="bg-accent aspect-video max-h-[50svh] w-fit"
        />
      )}

      <ul className="flex w-full *:flex-1">
        {[...Array(3)].map((_, i) => (
          <li key={i}>
            <Button className="w-full" variant={i === serverIdx ? 'default' : 'ghost'} onClick={() => setServerIdx(i)}>
              Server {i + 1}
            </Button>
          </li>
        ))}
      </ul>

      <p className="sm-muted">{media.overview}</p>

      <MediaDetailsList media={media} className="**:justify-center! lg:justify-center" />

      <div className="flex flex-wrap gap-2 lg:justify-start">
        {media.genres.map((genre) => (
          <ButtonLink key={genre.id} href={`/${'name' in media ? 'tv-shows' : 'movies'}?genres=${genre.id}`} variant="accentMuted">
            {genre.name}
          </ButtonLink>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} showSwipeHandle snapPoints={['19rem', 1]}>
        <DrawerTrigger render={<Button />} className="lg:hidden">
          <PlayIcon /> Watch Now
        </DrawerTrigger>
        <DrawerContent className="min-h-1/2 text-center">
          <DrawerHeader>
            <DrawerTitle> {title}</DrawerTitle>
          </DrawerHeader>
          <WatchContent />
        </DrawerContent>
      </Drawer>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger render={<Button />} className="max-lg:hidden">
          <PlayIcon /> Watch Now
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader className="pb-0">
            <DialogTitle> {title}</DialogTitle>
          </DialogHeader>
          <WatchContent />
        </DialogContent>
      </Dialog>
    </>
  )
}

function Series({ media, serverIdx }: { media: TTvDetails; serverIdx: number }) {
  const { season, episode, changeSeason, changeEpisode } = useTvSeries(media.id)
  const seasonItems = media.seasons.map(({ season_number: s }) => ({ value: String(s), label: `Season ${s}` }))

  const currentSeason = media.seasons.find((s) => s.season_number === season)
  const episodeItems = Array.from({ length: currentSeason?.episode_count ?? 0 }, (_, i) => ({ value: String(i + 1), label: `Episode ${i + 1}` }))

  const src = TV_SERVERS[serverIdx](media.id, season, episode)
  return (
    <>
      <div className="mb-6 flex w-full gap-2 *:flex-1">
        <Select items={seasonItems} value={String(season)} onValueChange={(v) => changeSeason(Number(v))}>
          <SelectTrigger>
            <SelectValue placeholder="Season" />
          </SelectTrigger>
          <SelectContent>
            {seasonItems.map((i) => (
              <SelectItem key={i.value} value={i.value}>
                {i.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select items={episodeItems} value={String(episode)} onValueChange={(v) => changeEpisode(Number(v))}>
          <SelectTrigger>
            <SelectValue placeholder="Episode" />
          </SelectTrigger>
          <SelectContent>
            {episodeItems.map((i) => (
              <SelectItem key={i.value} value={i.value}>
                {i.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <iframe
        key={src}
        src={src}
        title={media.name}
        allowFullScreen
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        referrerPolicy="origin"
        className="bg-accent aspect-video max-h-[50svh] w-fit"
      />
    </>
  )
}
