import TMDBImage from '@/components/image'
import { MediaRating } from '@/components/medias/media-rating'
import { MediaSection } from '@/components/medias/sections/helpers'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevAndNext } from '@/components/ui/carousel'
import { TMDBFetch } from '@/lib/fetcher'
import type { TTvDetails } from '@/schema & types/tmdb'
import Link from 'next/link'

export default async function TvSeasonsSection({ show_id }: { show_id: string }) {
  const result = await TMDBFetch<TTvDetails>(`/tv/${show_id}`)
  if (!result.isSuccess) return <p>error</p>

  const { seasons } = result.data
  return (
    <MediaSection section="Seasons">
      <Carousel opts={{ dragFree: true, slidesToScroll: 'auto' }}>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="mb-0">
            Seasons <span>{seasons.length}</span>
          </h3>

          <CarouselPrevAndNext />
        </div>

        <CarouselContent className="-ml-3">
          {seasons.map((season, i) => (
            <CarouselItem key={i} className="basis-4/9 pl-3 sm:basis-3/10 xl:basis-2/9">
              <Link href={`/tv/${show_id}/season/${season.season_number}`} scroll={true} className="group">
                <div className="aspect-2/3 overflow-hidden rounded-md">
                  <TMDBImage type="poster" src={season.poster_path} alt="" className="size-full transition-transform group-hover:scale-110" />
                </div>

                <div className="group-hover:text-primary mt-1 space-y-0.5 text-sm">
                  <div>{season.name}</div>
                  <div className="flex items-center justify-between">
                    <div className="xs-muted">{season.air_date?.split('-')[0]}</div>
                    <MediaRating average={season.vote_average} />
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
