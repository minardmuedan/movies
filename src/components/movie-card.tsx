import Link from 'next/link'
import TMDBImage from './image'
import type { TMovie } from '@/types/tmdb'
import { StarIcon } from 'lucide-react'

export default function MovieCard({ movie }: { movie: TMovie }) {
  return (
    <Link href={`/movie/${movie.id}`} className="accent-muted flex h-full flex-col gap-2 rounded-md p-2 text-sm">
      <TMDBImage
        type="poster"
        src={movie.poster_path}
        alt=""
        sizes="(min-width: 640px) calc(24.83vw - 106px), (min-width: 440px) calc(25vw - 103px), 3px"
        className="aspect-2/3 rounded"
      />

      <div className="flex flex-1 flex-col justify-between gap-2">
        <p>{movie.title}</p>
        <div className="text-muted-foreground flex justify-between text-xs">
          <div>{movie.release_date?.split('-')[0]}</div>
          <div className="flex items-center gap-1 text-yellow-600">
            <StarIcon className="size-4" /> {movie.vote_average.toFixed(1)}
          </div>
        </div>
      </div>
    </Link>
  )
}
