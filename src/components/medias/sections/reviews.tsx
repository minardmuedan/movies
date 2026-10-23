import TMDBImage from '@/components/image'
import { Button } from '@/components/ui/button'
import { timeAgo } from '@/lib/time-format'
import type { TMediaReviews } from '@/types/tmdb'

export default function MediaReviewsSection({ reviews }: { reviews: TMediaReviews }) {
  return (
    <section className="relative max-h-[80svh] flex-1 overflow-hidden">
      <h3>
        Review <span>{reviews.total_results}</span>
      </h3>

      <ul className="space-y-2">
        {reviews.results.map((review, i) => (
          <li key={i} className="accent-muted rounded border p-2">
            <div className="flex items-center gap-2 text-sm">
              <TMDBImage type="profile" src={review.author_details.avatar_path} alt="" className="size-6 rounded-full" />
              <div>{review.author}</div>
              <div className="xs-muted">{timeAgo(review.created_at)}</div>
            </div>

            <p className="sm-muted mt-6">{review.content}</p>
          </li>
        ))}
      </ul>

      <div className="from-background to-background/0 absolute bottom-0 flex h-1/3 w-full items-end justify-center bg-linear-to-t from-25%">
        <Button variant="link">View Full Reviews</Button>
      </div>
    </section>
  )
}
