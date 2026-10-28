import MediaBackdrop from '@/components/medias/media-backdrop'
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
      <MediaBackdrop backdrops={result.data.results.map(({ backdrop_path }) => backdrop_path)} />

      <ul className="media-card-container">
        {movies.map((movie) => (
          <li key={movie.id}>
            <MediaCard data={movie} />
          </li>
        ))}
      </ul>

      <MediaPagination page={currentPage} totalPages={result.data.total_pages} route="/movies" />
    </>
  )
}
