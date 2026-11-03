import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ErrorFallback } from '@/components/ui/empty-error'
import type { FetchReturn } from '@/lib/fetcher'
import type { TMediaReviews } from '@/schema & types/tmdb'
import { ExpandIcon } from 'lucide-react'
import { MediaReviews, Review } from '../media-reviews'

type Props = { media: 'movie' | 'tv'; mediaId: string }

export default function MediaReviewsSection({ media, mediaId, result }: Props & { result: FetchReturn<TMediaReviews> }) {
  return (
    <section className="relative flex-1 overflow-hidden lg:max-h-[80svh]">
      {!result.isSuccess ? (
        <>
          <h3>Review</h3>
          <ErrorFallback message={result.message} />
        </>
      ) : (
        <MediaReviewsContent media={media} mediaId={mediaId} reviews={result.data} />
      )}
    </section>
  )
}

function MediaReviewsContent({ media, mediaId, reviews }: Props & { reviews: TMediaReviews }) {
  const totalResults = reviews.total_results

  return (
    <Dialog>
      <div className="relative h-full text-start">
        <h3>
          Review <span>{totalResults}</span>
        </h3>

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
      </div>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="first-letter:uppercase">{media} Reviews</DialogTitle>
          <DialogDescription>See what others are saying</DialogDescription>
        </DialogHeader>

        <MediaReviews media={media} mediaId={mediaId} initialData={reviews} />
      </DialogContent>
    </Dialog>
  )
}
