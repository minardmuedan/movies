import TMDBImage from '@/components/image'
import { MovieSection } from '@/components/movie-section'
import { Button, ButtonLink } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { TMDBFetch } from '@/lib/fetcher'
import { type TMovieDetails } from '@/types/tmdb'
import { Building2Icon, CalendarDaysIcon, HourglassIcon, PlayIcon } from 'lucide-react'

export default async function MovieHero({ id }: { id: string }) {
  const result = await TMDBFetch<TMovieDetails>(`/movie/${id}`)

  if (!result.isSuccess) return <p>error</p>
  const movie = result.data

  return (
    <MovieSection section="Details">
      <div aria-label="background" className="absolute -top-14 left-0 -z-1 w-full opacity-50">
        <TMDBImage type="backdrop" src={movie.backdrop_path} alt="" sizes="100vw" className="aspect-video min-h-svh" />
        <div className="from-background to-background/0 absolute bottom-0 size-full bg-linear-to-t">
          <span className="sr-only">overlay</span>
        </div>
      </div>

      <div className="flex gap-6">
        <TMDBImage type="poster" src={movie.poster_path} alt={movie.title} className="aspect-2/3 w-full max-w-80 border" />
        <div className="space-y-12">
          <div>
            <h1 className="text-3xl font-medium">{movie.title}</h1>
            {movie.tagline && <div className="xs-muted">{movie.tagline}</div>}
            <p className="text-muted-foreground mt-3 max-w-175">{movie.overview}</p>
          </div>

          <Drawer showSwipeHandle>
            <DrawerTrigger render={<Button />}>
              <PlayIcon /> Watch Now
            </DrawerTrigger>
            <DrawerContent className="min-h-[75svh]">
              <DrawerHeader>
                <DrawerTitle>Watch {movie.title}</DrawerTitle>
              </DrawerHeader>

              <div className="p-2">
                <iframe
                  src={`https://vidfast.vc/movie/${movie.id}`}
                  width="100%"
                  height="100%"
                  allowFullScreen
                  allow="encrypted-media"
                  className="aspect-video"
                />
              </div>
            </DrawerContent>
          </Drawer>

          <ul className="space-y-4 text-sm *:flex *:gap-3 [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:stroke-1">
            {[
              [<CalendarDaysIcon />, new Date(movie.release_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })],
              [<HourglassIcon />, `${movie.runtime > 60 && `${Math.floor(movie.runtime / 60)} hr`} ${movie.runtime % 60} min`],
              [<Building2Icon />, movie.production_companies.map(({ name }) => `${name}, `)],
            ].map(([v1, v2], i) => (
              <li key={i}>
                {v1} {v2}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <ButtonLink key={genre.id} href={`/genre/${genre.id}`} variant="accentMuted">
                {genre.name}
              </ButtonLink>
            ))}
          </div>
        </div>
      </div>
    </MovieSection>
  )
}
