'use client'

import { Button, ButtonLink } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useModalHistory } from '@/hooks/use-modal'
import { useTvSeries } from '@/hooks/use-series'
import type { TMovieDetails, TTvDetails } from '@/schema & types/tmdb'
import { PlayIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { MediaDetailsList } from './details-list'

export function Watch(media: TMovieDetails | TTvDetails) {
  const [drawerOpen, setDrawerOpen] = useModalHistory()
  const [dialogOpen, setDialogOpen] = useModalHistory()
  const series = useTvSeries(media.id)

  const title = 'name' in media ? media.name : media.title
  const src =
    'seasons' in media
      ? `https://embed.vidrift.net/embed/tv/${media.id}/${series.season}/${series.episode}?font=Inter`
      : `https://embed.vidrift.net/embed/movie/${media.id}?font=Inter`

  const WatchContent = () => (
    <div className="mt-6 flex flex-col space-y-12 overflow-y-auto px-2 pb-6 text-center *:mx-auto lg:px-3">
      {'seasons' in media && <SelectSeries media={media} {...series} />}

      <iframe
        key={src}
        src={src}
        title={title}
        allowFullScreen
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        referrerPolicy="origin"
        className="bg-accent aspect-video max-h-[50svh] w-full overflow-hidden rounded-md"
      />

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
            <DrawerTitle>Watch {title}</DrawerTitle>
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
            <DialogTitle>Watch {title}</DialogTitle>
          </DialogHeader>
          <WatchContent />
        </DialogContent>
      </Dialog>
    </>
  )
}

function SelectSeries({ media, season, episode, changeSeason, changeEpisode }: { media: TTvDetails } & ReturnType<typeof useTvSeries>) {
  const seasonItems = media.seasons.map(({ season_number: s }) => ({ value: String(s), label: `Season ${s}` }))

  const currentSeason = media.seasons.find((s) => s.season_number === season)
  const episodeItems = Array.from({ length: currentSeason?.episode_count ?? 0 }, (_, i) => ({ value: String(i + 1), label: `Episode ${i + 1}` }))

  return (
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
  )
}
