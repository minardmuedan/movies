'use client'

import type { TImage, TMovieVideo } from '@/types/tmdb'
import Link from 'next/link'
import { createContext, useContext, useState, type Dispatch, type SetStateAction } from 'react'
import TMDBImage, { YoutubeImage } from './image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { ScrollArea } from './ui/scroll-area'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'

type Medias = { posters: TImage[]; backdrops: TImage[]; videos: TMovieVideo[] }
type MediaKeys = keyof Medias
type DialogContext = {
  activeMedia: MediaKeys | undefined
  setActiveMedia: Dispatch<SetStateAction<MediaKeys | undefined>>
}

const mediaDialogContext = createContext<DialogContext | null>(null)

const useMediaDialogContext = () => {
  const context = useContext(mediaDialogContext)
  if (!context) throw 'Context must be wrapped by a Provider'
  return context
}

const MovieMediaDialog = ({ children }: { children: React.ReactNode }) => {
  const [activeMedia, setActiveMedia] = useState<MediaKeys>()
  return (
    <mediaDialogContext.Provider value={{ activeMedia, setActiveMedia }}>
      <Dialog>{children}</Dialog>
    </mediaDialogContext.Provider>
  )
}

const MovieMediaDialogTrigger = ({ media, children, className }: { media: MediaKeys; children: React.ReactNode; className?: string }) => {
  const { setActiveMedia } = useMediaDialogContext()
  return (
    <DialogTrigger className={className} onClick={() => setActiveMedia(media)}>
      {children}
    </DialogTrigger>
  )
}

const MovieMediaDialogContentRender = ({ medias }: { medias: Medias }) => {
  const { activeMedia } = useMediaDialogContext()
  if (!activeMedia) return null

  return (
    <DialogContent className="max-h-[calc(100svh-2.5rem)] p-0 sm:max-w-xl md:max-w-3xl">
      <DialogHeader className="p-6">
        <DialogTitle className="first-letter:uppercase">{activeMedia}</DialogTitle>
      </DialogHeader>

      <ScrollArea className="px-6 pb-6">
        {activeMedia === 'videos' ? (
          <MovieVideosDialogContent videos={medias[activeMedia]} />
        ) : (
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {medias[activeMedia].map((media, i) => (
              <li key={i} style={{ aspectRatio: media.aspect_ratio }}>
                <Link href={`https://image.tmdb.org/t/p/original/${media.file_path}`} target="_blank" className="">
                  <TMDBImage
                    type="poster"
                    src={media.file_path}
                    alt="movie media picure"
                    sizes="(min-width: 640px) 170px, calc(50vw - 44px)"
                    className="size-full"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>
    </DialogContent>
  )
}

const MovieVideosDialogContent = ({ videos }: { videos: TMovieVideo[] }) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)

  return (
    <>
      <header className="mb-6">
        <Carousel opts={{ dragFree: true }}>
          <CarouselContent className="-ml-3 p-2">
            {videos.map((video, i) => (
              <CarouselItem key={i} className="basis-[28%] cursor-pointer pl-3" onClick={() => setActiveVideoIndex(i)}>
                <div
                  className={`relative aspect-video overflow-hidden rounded-md outline-offset-1 ${activeVideoIndex == i ? 'outline-primary outline-2' : ''}`}
                >
                  <YoutubeImage src={video.key} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </header>

      <section>
        <iframe src={`https://www.youtube.com/embed/${videos[activeVideoIndex].key}`} allowFullScreen className={`aspect-video w-full`} />
      </section>
    </>
  )
}

export { MovieMediaDialog, MovieMediaDialogContentRender, MovieMediaDialogTrigger }
