import TMDBImage from '@/components/image'
import { ButtonLink } from '@/components/ui/button'
import { ErrorFallback } from '@/components/ui/empty-error'
import WatchDrawer from '@/components/watch'
import { TMDBFetch } from '@/lib/fetcher'
import { type TMovieDetails, type TTvDetails } from '@/schema & types/tmdb'
import { Building2Icon, CalendarDaysIcon, HourglassIcon, LeafIcon, PlayIcon } from 'lucide-react'
import { Suspense } from 'react'
import { MediaSection, type SectionProps } from './helpers'
import { Skeleton } from '@/components/ui/skeleton'

export default function MediaHeroSection(props: SectionProps) {
  return (
    <MediaSection section="Details">
      <Suspense fallback={<LoadingFallback />}>
        <Data {...props} />
      </Suspense>
    </MediaSection>
  )
}

async function Data({ media, id }: SectionProps) {
  const result = await TMDBFetch<TMovieDetails>(`/${media}/${id}`)

  if (!result.isSuccess) return <ErrorFallback message={result.message} />
  return <Content media={result.data} />
}

function Content({ media }: { media: TMovieDetails | TTvDetails }) {
  const title = 'title' in media ? media.title : media.name
  const firstRelease = 'release_date' in media ? media.release_date : media.first_air_date
  const runtime = 'runtime' in media ? media.runtime : media.episode_run_time[0]

  return (
    <>
      <div aria-label="background" className="absolute -top-14 left-0 -z-1 w-full opacity-50">
        <TMDBImage preload type="backdrop" src={media.backdrop_path} alt={title} sizes="100.07vw" className="aspect-video min-h-svh w-full" />
        <div className="from-background to-background/0 absolute bottom-0 size-full bg-linear-to-t">
          <span className="sr-only">overlay</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start">
        <TMDBImage
          type="poster"
          src={media.poster_path}
          alt={title}
          sizes="(min-width: 380px) 320px, calc(60vw + 104px)"
          className="aspect-2/3 w-full max-w-80 shrink-0 rounded-md"
        />

        <div className="flex-1 space-y-12 text-center lg:text-start">
          <div>
            {media.tagline && <div className="xs-muted">{media.tagline}</div>}
            <h1 aria-label="title" className="text-3xl font-medium">
              {title}
            </h1>
            <p aria-label="description" className="sm-muted mt-3 max-w-175">
              {media.overview}
            </p>
          </div>

          <WatchDrawer tmdbId={media.id} title={title} type={'title' in media ? 'movie' : 'tv'} />

          <ul className="flex flex-wrap justify-center gap-6 text-sm *:flex *:gap-3 lg:justify-start [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:stroke-1">
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

          <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
            {media.genres.map((genre) => (
              <ButtonLink key={genre.id} href={`movies?genre/${genre.id}`} variant="accentMuted">
                {genre.name}
              </ButtonLink>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function LoadingFallback() {
  return (
    <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start">
      <Skeleton className="aspect-2/3 w-full max-w-80 shrink-0 rounded-md" />

      <div className="w-full flex-1 space-y-12">
        <div className="max-lg:**:mx-auto">
          <Skeleton className="mb-1 h-3 w-32" />
          <Skeleton aria-label="title" className="h-8 w-60" />

          <div aria-label="description" className="mt-3 w-full max-w-175 space-y-1">
            {['w-full', 'w-full', 'w-3/4'].map((cn, i) => (
              <Skeleton key={i} className={`h-5 ${cn}`} />
            ))}
          </div>
        </div>

        <Skeleton className="bg-primary/50 h-9 w-40 max-lg:mx-auto" />

        <div className="grid w-3/4 grid-cols-2 gap-6 max-lg:mx-auto">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className={`h-5 ${i === 2 ? 'col-span-2' : ''}`} />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-9 w-32" />
          ))}
        </div>
      </div>
    </div>
  )
}
