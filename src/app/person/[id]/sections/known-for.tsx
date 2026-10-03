import MovieCard from '@/components/movie-card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovies } from '@/types/tmdb'

export default async function PersonKnownFor({ id }: { id: string }) {
  const movies = await TMDBFetch<TMovies>(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.des&with_cast=${id}`)
  return (
    <section>
      <Carousel opts={{ dragFree: true, slidesToScroll: 'auto' }}>
        <div className="mb-6 flex items-center justify-between">
          <h2>known for</h2>

          <div className="flex gap-1">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>

        <CarouselContent className="-ml-2">
          {movies.results.map((movie, i) => (
            <CarouselItem key={i} className="basis-2/9 pl-2">
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
