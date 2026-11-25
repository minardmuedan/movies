import type { TMovieDetails, TTvDetails } from '@/schema & types/tmdb'
import { MediaRating } from './media-rating'
import { Building2Icon, CalendarDaysIcon, HourglassIcon, LeafIcon, PlayIcon } from 'lucide-react'
import { cn } from 'cn'

export function MediaDetailsList({ media, className }: { media: TMovieDetails | TTvDetails; className?: string }) {
  const firstRelease = 'release_date' in media ? media.release_date : media.first_air_date
  const runtime = 'runtime' in media ? media.runtime : media.episode_run_time[0]

  return (
    <ul className={cn('flex flex-wrap justify-center gap-6 *:flex **:gap-3 **:text-sm lg:justify-start [&_svg]:size-5 [&_svg]:shrink-0', className)}>
      <li>
        <MediaRating average={media.vote_average} />
      </li>

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

      <li className="basis-full justify-center lg:justify-start">
        <Building2Icon /> {media.production_companies.map(({ name }) => name).join(', ')}
      </li>
    </ul>
  )
}
