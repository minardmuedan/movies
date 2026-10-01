import TMDBImage from '@/components/image'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovies } from '@/types/tmdb'
import { StarIcon } from 'lucide-react'

export default async function MovieSimilar({ id }: { id: string }) {
  const movies = await TMDBFetch<TMovies>(`https://api.themoviedb.org/3/movie/${id}/similar`)

  return (
    <section className="overflow-x-hidden">
      <h2>More Like This</h2>

      <ul className="flex gap-2">
        {movies.results.map((movie, i) => (
          <li key={i} className="accent-muted size-fit">
            <TMDBImage type="poster" src={movie.poster_path} alt="" className="aspect-2/3 w-40" />

            <div className="flex flex-1 flex-col justify-between gap-2">
              <p>{movie.title}</p>

              <div className="xs-muted flex justify-between">
                <div>{movie.release_date?.split('-')[0]}</div>
                <div className="flex items-center gap-1 text-yellow-600">
                  <StarIcon className="size-4" /> {movie.vote_average.toFixed(1)}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
