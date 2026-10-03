import MovieCard from '@/components/movie-card'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovies } from '@/types/tmdb'

export default async function MovieRecommendations({ id }: { id: string }) {
  const movies = await TMDBFetch<TMovies>(`https://api.themoviedb.org/3/movie/${id}/recommendations`)

  return (
    <section>
      <h3>Recommended For You</h3>

      <ul className="grid grid-cols-4 gap-2">
        {movies.results.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </section>
  )
}
