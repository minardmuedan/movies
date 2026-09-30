import { TMovies } from '@/types/tmdb'
import { TMDBFetch } from '@/utils/fetcher'
import Link from 'next/link'

export default async function Home() {
  const movies = await TMDBFetch<TMovies>(`https://api.themoviedb.org/3/movie/now_playing`)
  return (
    <div>
      {movies.results.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`}>
          <p> {movie.title}</p>
        </Link>
      ))}
    </div>
  )
}
