import TMDBImage from '@/components/image'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevAndNext } from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { EmptyFallback, ErrorFallback } from '@/components/ui/empty-error'
import { Skeleton } from '@/components/ui/skeleton'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMediaCredits } from '@/schema & types/tmdb'
import { ExpandIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { MediaSection, type SectionProps } from './helpers'

export default function MediaCreditsSection(props: SectionProps) {
  return (
    <MediaSection section="Credits" className="relative">
      <Carousel opts={{ dragFree: true, slidesToScroll: 'auto' }}>
        <Suspense fallback={<LoadingFallback />}>
          <Data {...props} />
        </Suspense>
      </Carousel>
    </MediaSection>
  )
}

function Header({ count }: { count?: number }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h3 className="mb-0">Cast {count && <span>{count}</span>} </h3>
      <CarouselPrevAndNext />
    </div>
  )
}

async function Data({ media, id }: SectionProps) {
  const result = await TMDBFetch<TMediaCredits>(`/${media}/${id}/credits`)
  return (
    <>
      <Header count={result.isSuccess ? result.data.cast.length : undefined} />

      {!result.isSuccess ? (
        <ErrorFallback message={result.message} />
      ) : result.data.cast.length < 1 ? (
        <EmptyFallback className="min-h-41" />
      ) : (
        <>
          <CarouselContent className="-ml-5 lg:-ml-8">
            {result.data.cast.map((credit, i) => (
              <CarouselItem key={i} className="basis-30 pl-5 md:basis-34 lg:pl-8">
                <Link href={`/person/${credit.id}`} className="text-center text-sm transition-opacity hover:opacity-75">
                  <TMDBImage
                    type="profile"
                    src={credit.profile_path}
                    alt={credit.name}
                    sizes="(min-width: 1040px) 104px, (min-width: 780px) 116px, 100px"
                    className="mb-2 aspect-square w-full rounded-full"
                  />
                  <div>{credit.name}</div>
                  <p className="xs-muted line-clamp-2">{credit.character}</p>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-2 flex justify-center">
            <CreditsDialog credits={result.data} />
          </div>
        </>
      )}
    </>
  )
}

function CreditsDialog({ credits }: { credits: TMediaCredits }) {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="link" />}>
        Expand Credits <ExpandIcon />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Full Credits</DialogTitle>
          <DialogDescription>View all media credits</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto px-2 pb-3">
          {(['cast', 'crew'] as const).map(
            (label) =>
              credits[label].length > 0 && (
                <div key={label}>
                  <div className="text-muted-foreground mb-1 text-xl font-medium first-letter:uppercase">{label}</div>
                  <ul className="space-y-2">
                    {credits[label].map((c, i) => (
                      <li key={i}>
                        <Link href={`/person/${c.id}`} key={i} className="accent-muted flex items-center gap-3 rounded-lg border p-1 text-sm">
                          <TMDBImage
                            type="profile"
                            src={c.profile_path}
                            alt={`${c.name} profile`}
                            sizes="56px"
                            className="aspect-square h-14 rounded-full"
                          />

                          <div className="flex-1">
                            <div>{c.name}</div>
                            <div className="xs-muted">{'job' in c ? c.job : c.character}</div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function LoadingFallback() {
  return (
    <>
      <Header />
      <ul className="flex gap-5 overflow-hidden lg:gap-8">
        {[...Array(6)].map((_, i) => (
          <li key={i} className="shrink-0 basis-25 md:basis-26">
            <Skeleton className="mb-2 aspect-square w-full rounded-full" />
            <Skeleton className="mb-1 h-4 w-full" />
            <Skeleton className="mx-auto h-3 w-3/4" />
          </li>
        ))}
      </ul>
    </>
  )
}
