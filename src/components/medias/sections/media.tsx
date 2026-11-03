import TMDBImage, { YoutubeImage } from '@/components/image'
import { MediaDialog, MediaDialogContentRender, MediaDialogTrigger } from '../medias-dialog'
import { MediaSection } from '@/components/medias/sections/helpers'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevAndNext } from '@/components/ui/carousel'
import { type TMediaImages, type TMediaVideo, type TMediaVideos } from '@/schema & types/tmdb'
import type { FetchReturn } from '@/lib/fetcher'
import { ErrorFallback } from '@/components/ui/empty-error'

type Props = { results: [FetchReturn<TMediaImages>, FetchReturn<TMediaVideos>] }

export default function MediaMediasSection({ results }: Props) {
  const [imagesResult, videosResult] = results
  return (
    <MediaSection section="Media">
      {!imagesResult.isSuccess || !videosResult.isSuccess ? (
        <>
          <h3>Media</h3>
          <ErrorFallback message={'message' in imagesResult ? imagesResult.message : ''} />
        </>
      ) : (
        <MediaMediasContent images={imagesResult.data} videos={videosResult.data.results} />
      )}
    </MediaSection>
  )
}

function MediaMediasContent({ images, videos }: { images: TMediaImages; videos: TMediaVideo[] }) {
  const medias = [
    { title: 'posters', data: images.posters, displayCount: 4 },
    { title: 'backdrops', data: images.backdrops, displayCount: 3 },
    { title: 'videos', data: videos, displayCount: 3 },
  ] as const

  return (
    <Carousel opts={{ dragFree: true }}>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="mb-0">Media</h3>

        <CarouselPrevAndNext />
      </div>

      <MediaDialog>
        <CarouselContent className="-ml-10">
          {medias.map(({ title, data, displayCount }, i) => (
            <CarouselItem key={i} className="basis-2/3 pl-10 md:basis-1/3">
              <MediaDialogTrigger media={title} className="w-full cursor-pointer text-start transition-opacity hover:opacity-75">
                <h4 className="sm-muted mb-2 first-letter:uppercase">{title}</h4>

                <ul className="flex aspect-square flex-wrap gap-1 overflow-hidden rounded-md border">
                  {[...Array(Math.min(data.length, displayCount))].map((_, i) => (
                    <li key={i} className="relative grow basis-[calc(50%-0.125rem)] *:size-full">
                      {title === 'videos' ? (
                        <YoutubeImage
                          src={videos[i].key}
                          sizes="(min-width: 1680px) 367px, (min-width: 1040px) calc(26.61vw - 76px), (min-width: 780px) calc(29.58vw - 39px), calc(57.39vw - 21px)"
                        />
                      ) : (
                        <TMDBImage
                          type={title == 'backdrops' ? 'backdrop' : 'poster'}
                          src={images[title][i].file_path}
                          alt={`media index ${i}`}
                          sizes="(min-width: 1680px) 206px, (min-width: 1040px) calc(15vw - 43px), (min-width: 780px) calc(16.67vw - 22px), calc(32.17vw - 12px)"
                        />
                      )}

                      {data.length > displayCount && i === displayCount - 1 && (
                        <div className="bg-background/50 absolute inset-0 grid place-items-center text-sm font-medium">
                          {data.length - displayCount} +
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </MediaDialogTrigger>
            </CarouselItem>
          ))}
        </CarouselContent>

        <MediaDialogContentRender medias={{ posters: images.posters, backdrops: images.backdrops, videos }} />
      </MediaDialog>
    </Carousel>
  )
}
