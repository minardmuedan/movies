import { buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import type { TMediaReviews } from '@/types/tmdb'
import { ExpandIcon } from 'lucide-react'
import { MediaReviews, Review } from '../media-reviews'

type Props = { media: 'movie' | 'tv'; mediaId: string; reviews: TMediaReviews }

export default function MediaReviewsSection({ media, mediaId, reviews }: Props) {
  const resultsCount = reviews.results.length
  const totalResults = reviews.total_results

  return (
    <section className="relative max-h-[80svh] flex-1 overflow-hidden">
      <Dialog>
        <DialogTrigger className="text-start">
          <h3>
            Review <span>{totalResults}</span>
          </h3>

          <ul className="pointer-events-none space-y-2">
            {reviews.results.slice(0, 5).map((review, i) => (
              <Review key={i} review={review} />
            ))}
          </ul>

          <div className="from-background to-background/0 absolute bottom-0 flex h-1/3 w-full items-end justify-center bg-linear-to-t from-30%">
            <div className={buttonVariants({ variant: 'link' })}>
              <ExpandIcon /> Expand
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="first-letter:uppercase">{media} Reviews</DialogTitle>
            <DialogDescription>See what others are saying</DialogDescription>
          </DialogHeader>

          <MediaReviews media={media} mediaId={mediaId} initialData={reviews} />
        </DialogContent>
      </Dialog>
    </section>
  )
}
