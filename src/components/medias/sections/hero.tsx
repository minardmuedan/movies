import TMDBImage from '@/components/image'
import { Button, ButtonLink } from '@/components/ui/button'
import { type TMovieDetails, type TTvDetails } from '@/types/tmdb'
import { Building2Icon, CalendarDaysIcon, HourglassIcon, LeafIcon, PlayIcon } from 'lucide-react'
import { MediaSection } from './helpers'

export default function MediaHeroSection({ media }: { media: TMovieDetails | TTvDetails }) {
  const title = 'title' in media ? media.title : media.name
  const firstRelease = 'release_date' in media ? media.release_date : media.first_air_date
  const runtime = 'runtime' in media ? media.runtime : media.episode_run_time[0]

  return (
    <MediaSection section="Details">
      <div aria-label="background" className="absolute -top-14 left-0 -z-1 w-full opacity-50">
        <TMDBImage type="backdrop" src={media.backdrop_path} alt="" sizes="100vw" className="aspect-video min-h-svh w-full" />
        <div className="from-background to-background/0 absolute bottom-0 size-full bg-linear-to-t">
          <span className="sr-only">overlay</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start">
        <TMDBImage type="poster" src={media.poster_path} alt={title} className="aspect-2/3 w-full max-w-80 shrink-0 rounded-md" />

        <div className="space-y-12 text-center lg:text-start">
          <div>
            {media.tagline && <div className="xs-muted">{media.tagline}</div>}
            <h1 className="text-3xl font-medium">{title}</h1>
            <p className="sm-muted mt-3 max-w-175">{media.overview}</p>
          </div>

          <Button>
            <PlayIcon /> Watch Now
          </Button>

          <ul className="space-y-6 text-start text-sm *:flex *:gap-3 [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:stroke-1">
            {runtime && (
              <li>
                <HourglassIcon /> {runtime > 60 ? `${Math.floor(runtime / 60)} hr` : ''} {`${runtime % 60} min`}
              </li>
            )}

            {'number_of_seasons' in media && (
              <li>
                <LeafIcon /> {media.number_of_seasons} seasons
              </li>
            )}
            {'number_of_seasons' in media && (
              <li>
                <PlayIcon /> {media.number_of_episodes} episodes
              </li>
            )}

            <li>
              <CalendarDaysIcon /> {new Date(firstRelease).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
            </li>

            <li>
              <Building2Icon /> {media.production_companies.map(({ name }) => `${name}, `)}
            </li>
          </ul>

          <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
            {media.genres.map((genre) => (
              <ButtonLink key={genre.id} href={`/genre/${genre.id}`} variant="accentMuted">
                {genre.name}
              </ButtonLink>
            ))}
          </div>
        </div>
      </div>
    </MediaSection>
  )
}
