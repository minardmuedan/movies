'use client'

import { TTvEpisode } from '@/schema & types/tmdb'
import { createContext, useContext, useState, type Dispatch, type SetStateAction } from 'react'
import TMDBImage from '../image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { ScrollArea } from '../ui/scroll-area'
import { MediaRating } from './media-rating'

type TContext = { episodes: TTvEpisode[]; activeEpisode?: number; setActiveEpisode: Dispatch<SetStateAction<number | undefined>> }

const episodeContext = createContext<TContext | null>(null)

const useEpisodeContext = () => {
  const context = useContext(episodeContext)
  if (!context) throw 'Context must be wrapped inside a Provider'
  return context
}

const EpisodesDialog = ({ episodes, children }: { episodes: TTvEpisode[]; children: React.ReactNode }) => {
  const [activeEpisode, setActiveEpisode] = useState<number>()
  return (
    <episodeContext.Provider value={{ episodes, activeEpisode, setActiveEpisode }}>
      <Dialog>{children}</Dialog>
    </episodeContext.Provider>
  )
}

const EpisodeDialogTrigger = ({ episode }: { episode: TTvEpisode }) => {
  const { setActiveEpisode } = useEpisodeContext()

  return (
    <DialogTrigger
      onClick={() => setActiveEpisode(episode.episode_number)}
      className="accent-muted flex h-24 w-full cursor-pointer rounded-sm py-2 text-start text-sm md:h-28"
    >
      <div className="my-auto w-10 text-center">{episode.episode_number}</div>

      <TMDBImage type="still" src={episode.still_path} alt="" className="aspect-video h-full rounded" />

      <div className="*: ml-2 flex-1 *:line-clamp-2 md:*:line-clamp-3">
        {episode.name != String(episode.episode_number) && <div className="mb-2">{episode.name}</div>}
        <div className="xs-muted max-w-175">{episode.overview}</div>
      </div>

      <div className="flex flex-col justify-between pr-2 pl-6 text-xs">
        <MediaRating average={episode.vote_average} />
        <span className="text-muted-foreground">{episode.runtime} min</span>
      </div>
    </DialogTrigger>
  )
}

const EpisodesDialogContent = () => {
  const { episodes, activeEpisode } = useEpisodeContext()
  const episode = episodes.find(({ episode_number }) => activeEpisode === episode_number)

  if (!episode) return null
  return (
    <DialogContent className="text-center sm:max-w-lg">
      <DialogHeader className="gap-0 sm:text-start">
        <span className="xs-muted">Episode {episode.episode_number}</span>
        <DialogTitle className="text-xl text-pretty">{episode.name}</DialogTitle>
      </DialogHeader>

      <ScrollArea className="p-6 pt-0">
        <TMDBImage type="still" src={episode.still_path} alt="" className="mx-auto aspect-video w-full rounded-lg" />

        <p className="sm-muted mt-6">{episode.overview || 'no overview'}</p>
      </ScrollArea>
    </DialogContent>
  )
}

export { EpisodeDialogTrigger, EpisodesDialog, EpisodesDialogContent }
