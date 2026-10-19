import TMDBImage from '@/components/image'
import { MediaSection } from '@/components/medias/sections/helpers'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { MovieRating } from '@/components/ui/movie'
import { TMDBFetch } from '@/lib/fetcher'
import type { TTvDetails } from '@/types/tmdb'
import Link from 'next/link'

export default async function TvSeasonsSection({ id }: { id: string }) {
  const result = await TMDBFetch<TTvDetails>(`/tv/${id}`)
  if (!result.isSuccess) return <p>error</p>

  const { seasons } = result.data
  return (
    <MediaSection section="Seasons">
      <Carousel opts={{ dragFree: true, slidesToScroll: 'auto' }}>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="mb-0">
            Seasons <span>{seasons.length}</span>
          </h3>

          <div className="flex gap-1 lg:hidden">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>

        <CarouselContent className="-ml-3">
          {seasons.map((season, i) => (
            <CarouselItem key={i} className="basis-4/9 pl-3 sm:basis-3/10 xl:basis-2/9">
              <Link href={`/tv/${id}/${season.season_number}`} scroll={true} className="group">
                <div className="aspect-2/3 overflow-hidden rounded-md">
                  <TMDBImage type="poster" src={season.poster_path} alt="" className="size-full transition-transform group-hover:scale-110" />
                </div>

                <div className="group-hover:text-primary mt-1 space-y-0.5 text-sm">
                  <div>{season.name}</div>
                  <div className="flex items-center justify-between">
                    <div className="xs-muted">{season.air_date?.split('-')[0]}</div>
                    <MovieRating average={season.vote_average} />
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </MediaSection>
  )
}
