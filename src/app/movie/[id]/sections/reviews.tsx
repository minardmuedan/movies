import TMDBImage from '@/components/image'
import { Button } from '@/components/ui/button'
import { TMDBFetch } from '@/lib/fetcher'
import { TMovieReviews } from '@/types/tmdb'

export default async function MovieReviews({ id }: { id: string }) {
  const result = await TMDBFetch<TMovieReviews>(`/movie/${id}/reviews`)

  if (!result.isSuccess) return <p>error</p>

  return (
    <section className="relative max-h-[80svh] overflow-hidden">
      <h3>
        Review <span>{result.data.total_results}</span>
      </h3>

      <ul className="space-y-2">
        {result.data.results.map((review, i) => (
          <li key={i} className="accent-muted rounded border p-2">
            <div className="flex items-center gap-2 text-sm">
              <TMDBImage type="profile" src={review.author_details.avatar_path} alt="" className="size-6 rounded-full" />
              <div>{review.author}</div>
              <div className="xs-muted">{review.created_at.split('-')[0]}</div>
            </div>

            <p className="sm-muted mt-6 max-w-175">{review.content}</p>
          </li>
        ))}
      </ul>

      <div className="from-background to-background/0 absolute bottom-0 flex h-1/3 w-full items-end justify-center bg-linear-to-t from-25%">
        <Button variant="link">View Full Reviews</Button>
      </div>
    </section>
  )
}
