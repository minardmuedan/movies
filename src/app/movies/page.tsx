import MediaBackdrop from '@/components/medias/media-backdrop'
import MediaCard from '@/components/medias/media-card'
import MediaPagination from '@/components/medias/media-pagination'
import { EmptyFallback, ErrorFallback } from '@/components/ui/empty-error'
import { TMDBDiscoverFetch } from '@/lib/fetcher'
import { ratingsSchema } from '@/schema & types/params'

export default async function MoviesPage({ searchParams }: { searchParams: Promise<Record<string, unknown>> }) {
  const { page, sortby, genres, language, ratings, keywords } = await searchParams
  const parsedRatings = ratingsSchema.parse(ratings)

  const result = await TMDBDiscoverFetch('movie', {
    page,
    sort_by: sortby,
    with_genres: genres,
    with_original_language: language,
    'vote_average.lte': Math.max(...parsedRatings),
    'vote_average.gte': Math.min(...parsedRatings),
    with_keywords: keywords,
  })

  if (!result.isSuccess) return <ErrorFallback message={result.message} />

  const movies = result.data.results
  return (
    <>
      <MediaBackdrop backdrops={movies.map(({ backdrop_path }) => backdrop_path)} />

      <ul className="media-card-container">
        {movies.map((movie) => (
          <li key={movie.id}>
            <MediaCard data={movie} />
          </li>
        ))}
      </ul>

      <MediaPagination page={Number(result.data.page)} totalPages={result.data.total_pages} />
    </>
  )
}
