import MediaCard from '@/components/medias/media-card'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevAndNext } from '@/components/ui/carousel'
import { EmptyFallback, ErrorFallback } from '@/components/ui/empty-error'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovies, TTvShows } from '@/schema & types/tmdb'
import { Suspense } from 'react'
import { MediaSection, type SectionProps } from './helpers'

export default function MediaSimilarSection(props: SectionProps) {
  return (
    <Suspense fallback={'similar loading'}>
      <Data {...props} />
    </Suspense>
  )
}
async function Data({ media, id }: SectionProps) {
  const result = await TMDBFetch<TMovies | TTvShows>(`/${media}/${id}/similar`)

  return (
    <MediaSection section="Similar">
      {!result.isSuccess ? (
        <>
          <h3>More Like This</h3>
          <ErrorFallback message={result.message} />
        </>
      ) : result.data.results.length < 1 ? (
        <>
          <h3>More Like This</h3>
          <EmptyFallback />
        </>
      ) : (
        <Carousel opts={{ dragFree: true, slidesToScroll: 'auto' }}>
          <div className="mb-6 flex items-center justify-between">
            <h3 className="mb-0">More Like This</h3>
            <CarouselPrevAndNext />
          </div>

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
        </Carousel>
      )}
    </MediaSection>
  )
}
