import TMDBImage from '@/components/image'
import { TMDBFetch } from '@/lib/fetcher'
import { TMovieReviews } from '@/types/tmdb'

export default async function MovieReviews({ id }: { id: string }) {
  const reviews = await TMDBFetch<TMovieReviews>(`https://api.themoviedb.org/3/movie/${id}/reviews`)
  const firstReview = reviews.results[0]

  return (
    <section>
      <h3>
        Review <span>{reviews.total_results}</span>
      </h3>

      <div className="border">
        <div className="flex items-center">
          <TMDBImage type="profile" src={firstReview.author_details.avatar_path} alt="" className="size-8 rounded-full" />
          {firstReview.author}
          <div>{firstReview.created_at.split('-')[0]}</div>
        </div>

        <p className="sm-muted max-w-175">{firstReview.content}</p>
      </div>
    </section>
  )
}
