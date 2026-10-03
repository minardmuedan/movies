import TMDBImage from '@/components/image'
import MovieCard from '@/components/movie-card'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovies } from '@/types/tmdb'
import { StarIcon } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

export default async function MovieSimilar({ id }: { id: string }) {
  const movies = await TMDBFetch<TMovies>(`https://api.themoviedb.org/3/movie/${id}/similar`)

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
          {movies.results.map((movie) => (
            <CarouselItem key={movie.id} className="basis-2/9 pl-2">
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
