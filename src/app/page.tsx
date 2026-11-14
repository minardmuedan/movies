import MediaCard from '@/components/medias/media-card'
import SearchDialog from '@/components/search-dialog'
import { ButtonLink } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { TMDBDiscoverFetch, TMDBMovies } from '@/lib/fetcher'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'

export default async function Homepage() {
  const promises = Object.values(TMDBMovies).map(({ fn }, i) => (i === 1 ? TMDBDiscoverFetch('movie', {}) : fn(1)))
  const datas = await Promise.all(promises)
  const movies = Object.entries(TMDBMovies).map(([key, { title }], i) => {
    if (i === 1) return { href: 'movies/', title: 'Popular Movies', data: datas[i] }
    return { href: `/movies/${key}`, title, data: datas[i] }
  })

  return (
    <>
      <div className="mask-image absolute top-0 left-0 -z-1 inline-block h-svh w-full mask-b-to-transparent opacity-25">
        <Image loading="eager" src="/hero-bg.png" alt="hero background" fill className="object-cover" />
      </div>

      <section className="flex h-[75svh] items-center justify-center">
        <div className="text-center">
          <div className="xs-muted">finding something to watch? this might be -</div>
          <h1 className="font-bolota text-5xl lg:text-7xl">
            YOUR ULTIMATE <br className="max-lg:hidden" />
            <span className="text-primary [-webkit-text-stroke:1px_white]">ENTERTAINMENT</span> DESTINATION
          </h1>

          <nav className="mt-8 flex justify-center gap-2">
            <ButtonLink href="/movies">Movies</ButtonLink>
            <ButtonLink variant="outline" href="/tv-shows">
              Tv Shows
            </ButtonLink>
            <SearchDialog className="*:data-[slot=placeholder]:max-md:sr-only md:w-52" />
          </nav>
        </div>
      </section>

      {movies.map(({ href, title, data }, i) => (
        <section key={i} className={`mt-2 ${i !== movies.length - 1 ? 'mb-20' : ''}`}>
          <div className="mb-2 flex items-center justify-between gap-2">
            <h2 className="text-muted-foreground">{title}</h2>

            <ButtonLink href={href} variant="link">
              View More <ArrowRightIcon />
            </ButtonLink>
          </div>

          <Carousel opts={{ dragFree: true }}>
            <CarouselContent className="-ml-2">
              {(data.isSuccess ? data.data.results : []).map((data, i2) => (
                <CarouselItem key={i2} className="basis-4/9 pl-2 sm:basis-3/10 md:basis-2/9 lg:basis-2/11">
                  <MediaCard data={data} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      ))}
    </>
  )
}
