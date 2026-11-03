import MediaCard from '@/components/medias/media-card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { ErrorFallback } from '@/components/ui/empty-error'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovies } from '@/schema & types/tmdb'

export default async function PersonKnownForSection({ id }: { id: string }) {
  const result = await TMDBFetch<TMovies>(`/discover/movie?sort_by=popularity.des&with_cast=${id}`)

  if (!result.isSuccess)
    return (
      <section>
        <h2>Known For</h2>
        <ErrorFallback message={result.message} />
      </section>
    )

  return (
    <section>
      <Carousel opts={{ dragFree: true, slidesToScroll: 'auto' }}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="mb-0">Known for</h2>

          <div className="flex gap-1">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>

        <CarouselContent className="-ml-2">
          {result.data.results.map((movie, i) => (
            <CarouselItem key={i} className="basis-4/9 pl-2 sm:basis-3/10 md:basis-2/9 lg:basis-2/11">
              <MediaCard
                data={movie}
                imageSizes="(min-width: 1700px) 258px, (min-width: 1040px) calc(15.94vw - 10px), (min-width: 780px) calc(22.5vw - 34px), (min-width: 640px) calc(30vw - 33px), calc(44.38vw - 29px)"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
