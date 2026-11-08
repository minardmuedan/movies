import MediaCard, { MediaCardSkeleton } from '@/components/medias/media-card'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevAndNext } from '@/components/ui/carousel'
import { EmptyFallback, ErrorFallback } from '@/components/ui/empty-error'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovies, TTvShows } from '@/schema & types/tmdb'
import { Suspense } from 'react'
import { MediaSection, type SectionProps } from './helpers'

export default function MediaSimilarSection(props: SectionProps) {
  return (
    <MediaSection section="Similar">
      <Carousel opts={{ dragFree: true, slidesToScroll: 'auto' }}>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="mb-0">More Like This</h3>
          <CarouselPrevAndNext />
        </div>

        <Suspense fallback={<LoadingFallback />}>
          <Data {...props} />
        </Suspense>
      </Carousel>
    </MediaSection>
  )
}

async function Data({ media, id }: SectionProps) {
  const result = await TMDBFetch<TMovies | TTvShows>(`/${media}/${id}/similar`, 'details')

  if (!result.isSuccess) return <ErrorFallback message={result.message} />
  if (result.data.results.length < 1) return <EmptyFallback />
  return (
    <CarouselContent className="-ml-2">
      {result.data.results.map((data, i) => (
        <CarouselItem key={i} className="basis-4/9 pl-2 sm:basis-3/10 xl:basis-2/9">
          <MediaCard
            data={data}
            imageSizes="(min-width: 1680px) 273px, (min-width: 1280px) calc(18.68vw - 37px), (min-width: 1040px) calc(30vw - 103px), (min-width: 640px) calc(30vw - 33px), calc(44.38vw - 29px)"
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
        <li key={i} className="shrink-0 basis-[calc(4/9*100%-8px)] sm:basis-[calc(30%-8px)] xl:basis-[calc(2/9*100%-8px)]">
          <MediaCardSkeleton />
        </li>
      ))}
    </ul>
  )
}
