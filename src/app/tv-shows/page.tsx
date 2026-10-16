import TMDBImage from '@/components/image'
import MediaCard from '@/components/media-card'
import { TMDBFetch } from '@/lib/fetcher'
import { TTvShows } from '@/types/tmdb'

export default async function TvShowsPage() {
  const result = await TMDBFetch<TTvShows>('/tv/airing_today')
  if (!result.isSuccess) return <p>error</p>
  const tvShows = result.data.results

  return (
    <>
      <div aria-label="background" className="absolute -top-14 left-0 -z-1 w-full opacity-50">
        <TMDBImage type="backdrop" src={tvShows[0].backdrop_path} alt="" sizes="100vw" className="aspect-video" />
        <div className="from-background to-background/0 absolute bottom-0 h-1/2 w-full bg-linear-to-t">
          <span className="sr-only">overlay</span>
        </div>
      </div>

      <div className="flex gap-3 py-6">
        {/* <MoviesSideNav /> */}

        <section className="flex-1">
          <header className="h-36 content-center">
            <h1 className="text-3xl font-semibold">Now Playing Movies</h1>
            <p className="sm-muted">Catch the latest movies currently showing in theaters</p>
          </header>

          <ul className="grid grid-cols-4 gap-2">
            {tvShows.map((tv) => (
              <li key={tv.id}>
                <MediaCard type="tv" data={tv} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
