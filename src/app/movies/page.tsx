import MediaBackdrop from '@/components/medias/media-backdrop'
import MediaCard from '@/components/medias/media-card'
import MediaPagination from '@/components/medias/media-pagination'
import { TMDBDiscoverFetch } from '@/lib/fetcher'
import { ratingsSchema } from '@/schema & types/params'

export default async function MoviesPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const { page, language, genres, ratings, keywords } = await searchParams
  const parsedRatings = ratingsSchema.parse(ratings)

  const result = await TMDBDiscoverFetch('movie', {
    page,
    with_original_language: language,
    with_genres: genres,
    'vote_average.lte': Math.max(...parsedRatings),
    'vote_average.gte': Math.min(...parsedRatings),
    with_keywords: keywords,
  })

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

      <MediaPagination page={Number(result.data.page)} totalPages={result.data.total_pages} route="/movies" />
    </>
  )
}
