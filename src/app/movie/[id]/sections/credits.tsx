import TMDBImage from '@/components/image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovieCredits } from '@/types/tmdb'
import Link from 'next/link'

export default async function MovieCredits({ id }: { id: string }) {
  const result = await TMDBFetch<TMovieCredits>(`/movie/${id}/credits`)

  if (!result.isSuccess) return <p>error</p>

  const credits = result.data
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
          {credits.cast.map((credit, i) => (
            <CarouselItem key={i} className="basis-36 pl-8">
              <Link href={`/person/${credit.id}`} className="text-center text-sm">
                <TMDBImage type="profile" src={credit.profile_path} alt="" className="mb-2 aspect-square w-full rounded-full" />
                <div>{credit.name}</div>
                <div className="xs-muted">{credit.character}</div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
