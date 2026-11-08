import MediaCard, { MediaCardSkeleton } from '@/components/medias/media-card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { ErrorFallback } from '@/components/ui/empty-error'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovies } from '@/schema & types/tmdb'
import { Suspense } from 'react'

export default function PersonKnownForSection({ person_id }: { person_id: string }) {
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

        <Suspense fallback={<LoadingFallback />}>
          <Data person_id={person_id} />
        </Suspense>
      </Carousel>
    </section>
  )
}

async function Data({ person_id }: { person_id: string }) {
  const result = await TMDBFetch<TMovies>(`/discover/movie?sort_by=popularity.des&with_cast=${person_id}`, 'details')

  if (!result.isSuccess) return <ErrorFallback message={result.message} />
  return (
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
  )
}

function LoadingFallback() {
  return (
    <ul className="flex gap-2 overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <li key={i} className="shrink-0 basis-[calc(4/9*100%-8px)] sm:basis-[30%-8px] md:basis-[calc(2/9*100%)-8px] lg:basis-[calc(2/11*100%-8px)]">
          <MediaCardSkeleton />
        </li>
      ))}
    </ul>
  )
}
