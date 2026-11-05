import TMDBImage from '@/components/image'
import { MediaRating } from '@/components/medias/media-rating'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevAndNext } from '@/components/ui/carousel'
import { EmptyFallback, ErrorFallback } from '@/components/ui/empty-error'
import { Skeleton } from '@/components/ui/skeleton'
import { MediaSection } from '@/details-sections/helpers'
import { TMDBFetch } from '@/lib/fetcher'
import type { TTvDetails, TTvSeason } from '@/schema & types/tmdb'
import Link from 'next/link'
import { Suspense } from 'react'

export default function TvSeasonsSection({ id }: { id: string }) {
  return (
    <MediaSection section="Seasons">
      <Carousel opts={{ dragFree: true, slidesToScroll: 'auto' }}>
        <Suspense fallback={<LoadingFallback />}>
          <Data id={id} />
        </Suspense>
      </Carousel>
    </MediaSection>
  )
}

function Header({ count }: { count?: number }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h3 className="mb-0">Seasons {count && <span>{count}</span>} </h3>
      <CarouselPrevAndNext />
    </div>
  )
}

async function Data({ id }: { id: string }) {
  const result = await TMDBFetch<TTvDetails>(`/tv/${id}`)

  return (
    <MediaSection section="Seasons">
      <Header count={result.isSuccess ? result.data.seasons.length : undefined} />

      {!result.isSuccess ? (
        <ErrorFallback message={result.message} />
      ) : result.data.seasons.length < 1 ? (
        <EmptyFallback />
      ) : (
        <SeasonsContent show_id={id} seasons={result.data.seasons} />
      )}
    </MediaSection>
  )
}

function SeasonsContent({ show_id, seasons }: { show_id: string; seasons: TTvSeason[] }) {
  return (
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
  )
}

function LoadingFallback() {
  return (
    <>
      <Header />
      <ul className="flex gap-3 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <li key={i} className="shrink-0 basis-[calc(4/9*100%-12px)] sm:basis-[calc(30%-12px)] xl:basis-[calc(2/9*100%-12px)]">
            <Skeleton className="mb-1 aspect-2/3" />

            <Skeleton className="mb-1 h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </li>
        ))}
      </ul>
    </>
  )
}
