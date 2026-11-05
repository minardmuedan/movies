import { MediaReviews, Review, ReviewSkeleton } from '@/components/medias/media-reviews'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { EmptyFallback, ErrorFallback } from '@/components/ui/empty-error'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMediaReviews } from '@/schema & types/tmdb'
import { ExpandIcon } from 'lucide-react'
import { Suspense } from 'react'
import type { SectionProps } from './helpers'

export default function MediaReviewsSection(props: SectionProps) {
  return (
    <section className="relative flex-1 overflow-hidden lg:max-h-[80svh]">
      <Suspense fallback={<LoadingFallback />}>
        <Data {...props} />
      </Suspense>
    </section>
  )
}

function Header({ count }: { count?: number }) {
  return <h3>Review {count && <span>{count}</span>}</h3>
}

async function Data({ media, id }: SectionProps) {
  const result = await TMDBFetch<TMediaReviews>(`/${media}/${id}/reviews`)
  return (
    <>
      <Header count={result.isSuccess ? result.data.total_results : undefined} />
      {!result.isSuccess ? (
        <ErrorFallback message={result.message} />
      ) : result.data.results.length < 1 ? (
        <EmptyFallback />
      ) : (
        <Content media={media} id={id} reviews={result.data} />
      )}
    </>
  )
}

function Content({ media, id, reviews }: SectionProps & { reviews: TMediaReviews }) {
  return (
    <Dialog>
      <ul className="pointer-events-none space-y-2">
        {reviews.results.slice(0, 5).map((review, i) => (
          <Review key={i} review={review} />
        ))}
      </ul>

      <div className="from-background to-background/0 absolute bottom-0 flex h-1/3 w-full items-end justify-center bg-linear-to-t from-30%">
        <DialogTrigger render={<Button variant="link" />}>
          <ExpandIcon /> Expand
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="first-letter:uppercase">{media} Reviews</DialogTitle>
          <DialogDescription>See what others are saying</DialogDescription>
        </DialogHeader>

        <MediaReviews media={media} mediaId={id} initialData={reviews} />
      </DialogContent>
    </Dialog>
  )
}

function LoadingFallback() {
  return (
    <>
      <Header />
      <ul className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <ReviewSkeleton key={i} />
        ))}
      </ul>
    </>
  )
}
