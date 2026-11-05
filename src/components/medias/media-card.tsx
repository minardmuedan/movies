import type { TMovie, TTv } from '@/schema & types/tmdb'
import Link from 'next/link'
import TMDBImage from '../image'
import { MediaRating } from './media-rating'
import { Skeleton } from '../ui/skeleton'
import { cn } from 'cn'

export default function MediaCard({ data, imageSizes }: { data: TMovie | TTv; imageSizes?: string }) {
  const type = 'name' in data ? 'tv' : 'movie'
  const sizes =
    imageSizes ||
    '(min-width: 1700px) 283px, (min-width: 1280px) calc(16vw + 14px), (min-width: 780px) calc(23.54vw - 21px), (min-width: 640px) calc(35vw - 45px), (min-width: 400px) calc(50vw - 30px), calc(5vw + 141px)'

  const title = 'title' in data ? data.title : data.name
  const firstReleaseDate = 'release_date' in data ? data.release_date : data.first_air_date

  return (
    <Link href={`/${type}/${data.id}`} className="accent-muted flex h-full flex-col gap-2 rounded-md p-2 text-sm">
      <TMDBImage type="poster" alt={title} src={data.poster_path} sizes={sizes} className="aspect-2/3 rounded" />

      <div className="flex flex-1 flex-col justify-between gap-2">
        <p>{title}</p>
        <div className="text-muted-foreground flex justify-between text-xs">
          <div>{firstReleaseDate?.split('-')[0]}</div>
          <MediaRating average={data.vote_average} />
        </div>
      </div>
    </Link>
  )
}

export function MediaCardSkeleton() {
  return (
    <div aria-label="media card skeleton" className="rounded-md border p-2">
      <Skeleton className="aspect-2/3 rounded" />

      <Skeleton className="mt-2 mb-1 h-4 w-32" />
      <Skeleton className="h-3 w-16" />
    </div>
  )
}

export function MediaCardsLoadingFallback({ className }: { className?: string }) {
  return (
    <ul className={cn('media-card-container', className)}>
      {[...Array(20)].map((_, i) => (
        <li key={i}>
          <MediaCardSkeleton />
        </li>
      ))}
    </ul>
  )
}
