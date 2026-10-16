import MediaCard from '@/components/media-card'
import { MovieSection } from '@/components/movie-section'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovies } from '@/types/tmdb'

export default async function MovieRecommendations({ id }: { id: string }) {
  const result = await TMDBFetch<TMovies>(`/movie/${id}/recommendations`)

  if (!result.isSuccess) return <p>error</p>

  const movies = result.data.results
  return (
    <MovieSection section="Recommendations">
      <h3>Recommended For You</h3>

      <ul className="media-card-container md:grid-cols-3 xl:grid-cols-4">
        {movies.map((movie) => (
          <li key={movie.id}>
            <MediaCard type="movie" data={movie} />
          </li>
        ))}
      </ul>
    </MovieSection>
  )
}
