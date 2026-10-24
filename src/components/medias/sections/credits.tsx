import TMDBImage from '@/components/image'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevAndNext } from '@/components/ui/carousel'
import type { TMediaCredits } from '@/types/tmdb'
import Link from 'next/link'
import { MediaSection } from './helpers'

export default function MediaCreditsSection({ credits }: { credits: TMediaCredits }) {
  return (
    <MediaSection section="Credits">
      <Carousel opts={{ dragFree: true, slidesToScroll: 'auto' }}>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="mb-0">
            Cast <span>{credits.cast.length}</span>
          </h3>

          <CarouselPrevAndNext />
        </div>

        <CarouselContent className="-ml-5 lg:-ml-8">
          {credits.cast.map((credit, i) => (
            <CarouselItem key={i} className="basis-30 pl-5 md:basis-34 lg:pl-8">
              <Link href={`/person/${credit.id}`} className="text-center text-sm transition-opacity hover:opacity-75">
                <TMDBImage type="profile" src={credit.profile_path} alt="" className="mb-2 aspect-square w-full rounded-full" />
                <div>{credit.name}</div>
                <p className="xs-muted line-clamp-2">{credit.character}</p>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </MediaSection>
  )
}
