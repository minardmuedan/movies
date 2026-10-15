import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Link from 'next/link'

export default function Homepage() {
  return (
    <div>
      Homepage
      <Carousel className="pointer-events-none w-full md:overflow-visible">
        <CarouselContent className="md:ml-0 md:grid md:flex-none md:grid-cols-3 md:gap-4">
          {[...Array(3)].map((_, i) => (
            <CarouselItem key={i} className="basis-2/3 border p-4 md:basis-1/3">
              <Link href={`/fasd`} className="pointer-events-auto">
                hello
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
