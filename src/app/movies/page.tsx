import TMDBImage from '@/components/image'
import { Button } from '@/components/ui/button'
import { TMDBFetch } from '@/lib/fetcher'
import { TMovies, type TGenre } from '@/types/tmdb'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function MoviesPage() {
  const { genres } = await TMDBFetch<{ genres: TGenre[] }>('https://api.themoviedb.org/3/genre/movie/list')
  const movies = await TMDBFetch<TMovies>('https://api.themoviedb.org/3/movie/now_playing')

  return (
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
          <p className="text-muted-foreground text-sm">Catch the latest movies currently showing in theaters</p>
        </header>

        <ul className="grid grid-cols-4 gap-2">
          {movies.results.map((movie) => (
            <li key={movie.id}>
              <Link
                href={`/movie/${movie.id}`}
                className="bg-accent/30 hover:bg-accent flex h-full flex-col gap-2 rounded-md border p-2 text-sm transition-colors"
              >
                <div className="aspect-2/3 border">
                  <TMDBImage src={movie.poster_path} alt="" />
                </div>

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
  )
}
