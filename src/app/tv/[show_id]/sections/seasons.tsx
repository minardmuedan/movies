import TMDBImage from '@/components/image'
import { MediaRating } from '@/components/medias/media-rating'
import { MediaSection } from '@/components/medias/sections/helpers'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevAndNext } from '@/components/ui/carousel'
import { ErrorFallback } from '@/components/ui/empty-error'
import { TMDBFetch } from '@/lib/fetcher'
import type { TTvDetails, TTvSeason } from '@/schema & types/tmdb'
import Link from 'next/link'

export default async function TvSeasonsSection({ show_id }: { show_id: string }) {
  const result = await TMDBFetch<TTvDetails>(`/tv/${show_id}`)
  return (
    <MediaSection section="Seasons">
      {!result.isSuccess ? (
        <>
          <h3>Seasons</h3>
          <ErrorFallback message={result.message} />
        </>
      ) : (
        <SeasonsContent show_id={show_id} seasons={result.data.seasons} />
      )}
    </MediaSection>
  )
}

function SeasonsContent({ show_id, seasons }: { show_id: string; seasons: TTvSeason[] }) {
  return (
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
                <TMDBImage
                  type="poster"
                  src={season.poster_path}
                  alt={season.name}
                  sizes="(min-width: 1700px) 288px, (min-width: 1280px) 17.75vw, (min-width: 1040px) calc(30.45vw - 93px), (min-width: 640px) calc(30vw - 18px), calc(44.38vw - 13px)"
                  className="size-full transition-transform group-hover:scale-110"
                />
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
  )
}
