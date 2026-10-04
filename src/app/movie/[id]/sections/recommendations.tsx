import MovieCard from '@/components/movie-card'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovies } from '@/types/tmdb'

export default async function MovieRecommendations({ id }: { id: string }) {
  const result = await TMDBFetch<TMovies>(`/movie/${id}/recommendations`)

  if (!result.isSuccess) return <p>error</p>

  const movies = result.data.results
  return (
    <section>
      <h3>Recommended For You</h3>

      <ul className="grid grid-cols-4 gap-2">
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </section>
  )
}
