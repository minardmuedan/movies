import MediaBackdrop from '@/components/medias/media-backdrop'
import MediaCard from '@/components/medias/media-card'
import MediaPagination from '@/components/medias/media-pagination'
import { ErrorFallback } from '@/components/ui/empty-error'
import { TMDBMovies } from '@/lib/fetcher'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string>> }

export default async function MoviesPage({ params, searchParams }: Props) {
  const { slug } = await params
  const page = Number((await searchParams).page || 1)

  const activeRoute = TMDBMovies[slug as keyof typeof TMDBMovies]
  if (!activeRoute) return notFound()

  const result = await activeRoute.fn(page)
  if (!result.isSuccess) return <ErrorFallback message={result.message} />

  const movies = result.data.results
  return (
    <>
      <MediaBackdrop backdrops={movies.map(({ backdrop_path }) => backdrop_path)} />

      <ul className="media-card-container">
        {result.data.results.map((movie) => (
          <li key={movie.id}>
            <MediaCard data={movie} />
          </li>
        ))}
      </ul>

      <MediaPagination page={Number(result.data.page)} totalPages={result.data.total_pages} />
    </>
  )
}
