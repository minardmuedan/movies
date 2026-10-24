import TMDBImage from '@/components/image'
import MediaCard from '@/components/medias/media-card'
import MediaPagination from '@/components/medias/media-pagination'
import { TMDBFetch } from '@/lib/fetcher'
import { TMovies } from '@/types/tmdb'

export default async function MoviesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams
  const currentPage = Math.max(Number(page) || 1, 1)

  const result = await TMDBFetch<TMovies>(`/movie/now_playing?page=${currentPage}`)
  if (!result.isSuccess) return <p>error</p>

  const movies = result.data.results
  return (
    <>
      <div aria-label="background" className="absolute -top-14 left-0 -z-1 w-full opacity-25">
        <TMDBImage type="backdrop" src={movies[0].backdrop_path} alt="" sizes="100vw" className="aspect-video" />
        <div className="from-background to-background/0 absolute bottom-0 h-1/2 w-full bg-linear-to-t">
          <span className="sr-only">overlay</span>
        </div>
      </div>

      <section>
        <header className="h-36 content-center">
          <h1 className="text-3xl font-semibold">Now Playing Movies</h1>
          <p className="sm-muted">Catch the latest movies currently showing in theaters</p>
        </header>

        <ul className="media-card-container">
          {movies.map((movie) => (
            <li key={movie.id}>
              <MediaCard data={movie} />
            </li>
          ))}
        </ul>

        <MediaPagination page={currentPage} totalPages={result.data.total_pages} route="/movies" />
      </section>
    </>
  )
}
