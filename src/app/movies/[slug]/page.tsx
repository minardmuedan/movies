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
    <section>
      <MediaBackdrop backdrops={movies.map(({ backdrop_path }) => backdrop_path)} />

      <header className="my-12 flex flex-col max-lg:text-center">
        <h1 className="mb-2 text-3xl font-semibold">{activeRoute.title}</h1>
        <p className="sm-muted mb-6">Discover something new to watch.</p>
      </header>

      <ul className="media-card-container">
        {result.data.results.map((movie) => (
          <li key={movie.id}>
            <MediaCard data={movie} />
          </li>
        ))}
      </ul>

      <MediaPagination page={Number(result.data.page)} totalPages={result.data.total_pages} />
    </section>
  )
}
