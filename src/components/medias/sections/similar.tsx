import { Carousel, CarouselContent, CarouselItem, CarouselPrevAndNext } from '@/components/ui/carousel'
import type { TMovie, TTv } from '@/schema & types/tmdb'
import MediaCard from '../media-card'
import { MediaSection } from './helpers'

export default function MediaSimilarSection({ datas }: { datas: (TMovie | TTv)[] }) {
  return (
    <MediaSection section="Similar">
      <Carousel opts={{ dragFree: true, slidesToScroll: 'auto' }}>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="mb-0">More Like This</h3>
          <CarouselPrevAndNext />
        </div>

        <CarouselContent className="-ml-2">
          {datas.map((data, i) => (
            <CarouselItem key={i} className="basis-4/9 pl-2 sm:basis-3/10 xl:basis-2/9">
              <MediaCard
                data={data}
                imageSizes="(min-width: 1680px) 273px, (min-width: 1280px) calc(18.68vw - 37px), (min-width: 1040px) calc(30vw - 103px), (min-width: 640px) calc(30vw - 33px), calc(44.38vw - 29px)"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </MediaSection>
  )
}
