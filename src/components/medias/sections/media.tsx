import TMDBImage, { YoutubeImage } from '@/components/image'
import { MovieMediaDialog, MovieMediaDialogContentRender, MovieMediaDialogTrigger } from '@/components/media-dialog'
import { MediaSection } from '@/components/medias/sections/helpers'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevAndNext } from '@/components/ui/carousel'
import { type TMediaImages, type TMediaVideo } from '@/types/tmdb'

export default async function MediaMediasSection({ images, videos }: { images: TMediaImages; videos: TMediaVideo[] }) {
  const medias = [
    { title: 'posters', data: images.posters, displayCount: 4 },
    { title: 'backdrops', data: images.backdrops, displayCount: 3 },
    { title: 'videos', data: videos, displayCount: 3 },
  ] as const

  return (
    <MediaSection section="Media">
      <Carousel opts={{ dragFree: true }}>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="mb-0">Media</h3>

          <CarouselPrevAndNext />
        </div>

        <MovieMediaDialog>
          <CarouselContent className="-ml-10">
            {medias.map(({ title, data, displayCount }, i) => (
              <CarouselItem key={i} className="basis-2/3 pl-10 md:basis-1/3">
                <MovieMediaDialogTrigger media={title} className="w-full cursor-pointer text-start transition-opacity hover:opacity-75">
                  <h4 className="sm-muted mb-2 first-letter:uppercase">{title}</h4>

                  <ul className="flex aspect-square flex-wrap gap-1 overflow-hidden rounded-md border">
                    {[...Array(Math.min(data.length, displayCount))].map((_, i) => (
                      <li key={i} className="relative grow basis-[calc(50%-0.125rem)] *:size-full">
                        {title === 'videos' ? (
                          <YoutubeImage src={videos[i].key} />
                        ) : (
                          <TMDBImage type="poster" src={images[title][i].file_path} alt="" />
                        )}

                        {data.length > displayCount && i === displayCount - 1 && (
                          <div className="bg-background/50 absolute inset-0 grid place-items-center text-sm font-medium">
                            {data.length - displayCount} +
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </MovieMediaDialogTrigger>
              </CarouselItem>
            ))}
          </CarouselContent>

          <MovieMediaDialogContentRender medias={{ posters: images.posters, backdrops: images.backdrops, videos }} />
        </MovieMediaDialog>
      </Carousel>
    </MediaSection>
  )
}
