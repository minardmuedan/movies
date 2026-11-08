import TMDBImage, { YoutubeImage } from '@/components/image'
import { MediaDialog, MediaDialogContentRender, MediaDialogTrigger } from '@/components/medias/medias-dialog'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevAndNext } from '@/components/ui/carousel'
import { EmptyFallback, ErrorFallback } from '@/components/ui/empty-error'
import { TMDBFetch } from '@/lib/fetcher'
import { type TMediaImages, type TMediaVideo, type TMediaVideos } from '@/schema & types/tmdb'
import { Suspense } from 'react'
import { MediaSection, type SectionProps } from './helpers'
import { Skeleton } from '@/components/ui/skeleton'

export default function MediaMediasSection(props: SectionProps) {
  return (
    <MediaSection section="Media">
      <Carousel opts={{ dragFree: true }}>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="mb-0">Media</h3>
          <CarouselPrevAndNext />
        </div>

        <Suspense fallback={<LoadingFallback />}>
          <Data {...props} />
        </Suspense>
      </Carousel>
    </MediaSection>
  )
}

async function Data({ media, id }: SectionProps) {
  const promises = [
    TMDBFetch<TMediaImages>(`/${media}/${id}/images`, 'details'),
    TMDBFetch<TMediaVideos>(`/${media}/${id}/videos`, 'details'),
  ] as const
  const [imagesResult, videosResult] = await Promise.all(promises)

  if (!imagesResult.isSuccess || !videosResult.isSuccess) return <ErrorFallback message={'message' in imagesResult ? imagesResult.message : ''} />
  return <Content images={imagesResult.data} videos={videosResult.data.results} />
}

function Content({ images, videos }: { images: TMediaImages; videos: TMediaVideo[] }) {
  const medias = [
    { title: 'posters', data: images.posters, displayCount: 4 },
    { title: 'backdrops', data: images.backdrops, displayCount: 3 },
    { title: 'videos', data: videos, displayCount: 3 },
  ] as const

  return (
    <MediaDialog>
      <CarouselContent className="-ml-10">
        {medias.map(({ title, data, displayCount }, i) => (
          <CarouselItem key={i} className="basis-2/3 pl-10 md:basis-1/3">
            <h4 className="sm-muted mb-2 first-letter:uppercase">{title}</h4>
            {data.length < 1 ? (
              <EmptyFallback className="aspect-square" />
            ) : (
              <MediaDialogTrigger media={title} className="w-full cursor-pointer text-start transition-opacity hover:opacity-75">
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
            )}
          </CarouselItem>
        ))}
      </CarouselContent>

      <MediaDialogContentRender medias={{ posters: images.posters, backdrops: images.backdrops, videos }} />
    </MediaDialog>
  )
}

function LoadingFallback() {
  return (
    <div className="flex w-full gap-10 overflow-hidden">
      {Object.entries({ Posters: 4, Backdrops: 3, Videos: 3 }).map(([key, value]) => (
        <div key={key} className="flex-1 shrink-0 basis-2/3 md:basis-[calc(100%*1/3-3.5rem)]">
          <h4 className="sm-muted mb-2">{key}</h4>
          <div className="flex aspect-square flex-wrap gap-1">
            {[...Array(value)].map((_, i) => (
              <Skeleton key={i} className="grow basis-[calc(50%-0.125rem)]" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
