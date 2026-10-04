import TMDBImage from '@/components/image'
import MovieCard from '@/components/movie-card'
import { TMDBFetch } from '@/lib/fetcher'
import { TMovies } from '@/types/tmdb'
import MoviesSideNav from './sidenav'

export default async function MoviesPage() {
  const result = await TMDBFetch<TMovies>('/movie/now_playing')
  if (!result.isSuccess) return <p>error</p>
  const movies = result.data.results
  return (
    <>
      <div aria-label="background" className="absolute -top-14 left-0 -z-1 w-full opacity-50">
        <TMDBImage type="backdrop" src={movies[0].backdrop_path} alt="" sizes="100vw" className="aspect-video" />
        <div className="from-background to-background/0 absolute bottom-0 h-1/2 w-full bg-linear-to-t">
          <span className="sr-only">overlay</span>
        </div>
      </div>

      <div className="flex gap-3 py-6">
        <MoviesSideNav />

        <section className="flex-1">
          <header className="h-36 content-center">
            <h1 className="text-3xl font-semibold">Now Playing Movies</h1>
            <p className="sm-muted">Catch the latest movies currently showing in theaters</p>
          </header>

          <ul className="grid grid-cols-4 gap-2">
            {movies.map((movie) => (
              <li key={movie.id}>
                <MovieCard movie={movie} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
