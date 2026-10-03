import TMDBImage from '@/components/image'
import { Button } from '@/components/ui/button'
import { TMDBFetch } from '@/lib/fetcher'
import { TMovies, type TGenre } from '@/types/tmdb'
import { StarIcon } from 'lucide-react'
import Link from 'next/link'

export default async function MoviesPage() {
  const { genres } = await TMDBFetch<{ genres: TGenre[] }>('https://api.themoviedb.org/3/genre/movie/list')
  const movies = await TMDBFetch<TMovies>('https://api.themoviedb.org/3/movie/now_playing')

  return (
    <>
      <div aria-label="background" className="absolute -top-14 left-0 -z-1 w-full opacity-50">
        <TMDBImage type="backdrop" src={movies.results[0].backdrop_path} alt="" sizes="100vw" className="aspect-video" />
        <div className="from-background to-background/0 absolute bottom-0 h-1/2 w-full bg-linear-to-t">
          <span className="sr-only">overlay</span>
        </div>
      </div>

      <div className="flex gap-3 py-6">
        <aside className="w-full max-w-72 space-y-6 border p-6">
          <div>
            <div className="text-muted-foreground mb-2 font-medium">Genres</div>
            <ul className="flex flex-wrap gap-1">
              {genres.map((genre) => (
                <li key={genre.id}>
                  <Button size="sm" variant="outline">
                    {genre.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="flex-1">
          <header className="h-36 content-center">
            <h1 className="text-3xl font-semibold">Now Playing Movies</h1>
            <p className="sm-muted">Catch the latest movies currently showing in theaters</p>
          </header>

          <ul className="grid grid-cols-4 gap-2">
            {movies.results.map((movie) => (
              <li key={movie.id}>
                <Link href={`/movie/${movie.id}`} className="accent-muted flex h-full flex-col gap-2 rounded-md p-2 text-sm">
                  <TMDBImage
                    type="poster"
                    src={movie.poster_path}
                    alt=""
                    sizes="(min-width: 640px) calc(24.83vw - 106px), (min-width: 440px) calc(25vw - 103px), 3px"
                    className="bg-accent aspect-2/3 rounded"
                  />

                  <div className="flex flex-1 flex-col justify-between gap-2">
                    <p>{movie.title}</p>
                    <div className="text-muted-foreground flex justify-between text-xs">
                      <div>{movie.release_date?.split('-')[0]}</div>
                      <div className="flex items-center gap-1 text-yellow-600">
                        <StarIcon className="size-4" /> {movie.vote_average.toFixed(1)}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
