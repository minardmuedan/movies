import TMDBImage from '@/components/image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovieCredits } from '@/types/tmdb'

export default async function MovieCredits({ id }: { id: string }) {
  const credits = await TMDBFetch<TMovieCredits>(`https://api.themoviedb.org/3/movie/${id}/credits`)
  return (
    <section className="relative">
      <Carousel opts={{ dragFree: true, slidesToScroll: 'auto' }}>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="mb-0">
            Cast <span>{credits.cast.length}</span>
          </h3>

          <div className="flex gap-1">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>

        <CarouselContent className="-ml-8">
          {credits.cast.map((credit) => (
            <CarouselItem key={credit.id} className="basis-36 pl-8">
              <div className="text-center text-sm">
                <TMDBImage type="profile" src={credit.profile_path} alt="" className="mb-2 aspect-square w-full rounded-full" />
                <div>{credit.name}</div>
                <div className="xs-muted">{credit.character}</div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
