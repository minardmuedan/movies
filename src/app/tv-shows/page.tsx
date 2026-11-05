import MediaBackdrop from '@/components/medias/media-backdrop'
import MediaCard, { MediaCardsLoadingFallback } from '@/components/medias/media-card'
import MediaPagination from '@/components/medias/media-pagination'
import { EmptyFallback, ErrorFallback } from '@/components/ui/empty-error'
import { TMDBDiscoverFetch } from '@/lib/fetcher'
import { ratingsSchema } from '@/schema & types/params'
import { Suspense } from 'react'

type SearchParams = Promise<Record<string, unknown>>

export default async function TvShowsPage({ searchParams }: { searchParams: SearchParams }) {
  const search = await searchParams

  return (
    <Suspense key={JSON.stringify(search)} fallback={<MediaCardsLoadingFallback />}>
      <PageContent searchParams={search} />
    </Suspense>
  )
}

async function PageContent({ searchParams }: { searchParams: Awaited<SearchParams> }) {
  const { page, sortby, language, genres, ratings, keywords } = searchParams
  const parsedRatings = ratingsSchema.parse(ratings)

  const result = await TMDBDiscoverFetch('tv', {
    page,
    sort_by: sortby,
    with_original_language: language,
    with_genres: genres,
    'vote_average.lte': Math.max(...parsedRatings),
    'vote_average.gte': Math.min(...parsedRatings),
    with_keywords: keywords,
  })

  if (!result.isSuccess) return <ErrorFallback message={result.message} />
  const tvShows = result.data.results

  if (tvShows.length < 1) return <EmptyFallback />

  return (
    <>
      <MediaBackdrop backdrops={tvShows.map(({ backdrop_path }) => backdrop_path)} />

      <ul className="media-card-container [html[data-filterbar=open]_&]:lg:grid-cols-3 [html[data-filterbar=open]_&]:xl:grid-cols-4 [html[data-filterbar=open]_&]:2xl:grid-cols-5">
        {tvShows.map((movie) => (
          <li key={movie.id}>
            <MediaCard data={movie} />
          </li>
        ))}
      </ul>

      <MediaPagination page={Number(result.data.page)} totalPages={result.data.total_pages} />
    </>
  )
}
