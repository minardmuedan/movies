import MovieCard from '@/components/movie-card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovies } from '@/types/tmdb'

export default async function MovieSimilar({ id }: { id: string }) {
  const result = await TMDBFetch<TMovies>(`/movie/${id}/similar`)

  if (!result.isSuccess) return <p>error</p>

  return (
    <section className="overflow-x-hidden">
      <Carousel opts={{ dragFree: true, slidesToScroll: 'auto' }}>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="mb-0">More Like This</h3>

          <div className="flex gap-1">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>

        <CarouselContent className="-ml-2">
          {result.data.results.map((movie, i) => (
            <CarouselItem key={i} className="basis-2/9 pl-2">
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
