import type { TMovie, TTv } from '@/types/tmdb'
import Link from 'next/link'
import TMDBImage from '../image'
import { MovieRating } from '../ui/movie'

export default function MediaCard({ data }: { data: TMovie | TTv }) {
  const type = 'name' in data ? 'tv' : 'movie'
  const firstReleaseDate = 'release_date' in data ? data.release_date : data.first_air_date

  return (
    <Link href={`/${type}/${data.id}`} className="accent-muted flex h-full flex-col gap-2 rounded-md p-2 text-sm">
      <TMDBImage
        type="poster"
        src={data.poster_path}
        alt=""
        sizes="(min-width: 640px) calc(24.83vw - 106px), (min-width: 440px) calc(25vw - 103px), 3px"
        className="aspect-2/3 rounded"
      />

      <div className="flex flex-1 flex-col justify-between gap-2">
        <p>{'title' in data ? data.title : data.name}</p>
        <div className="text-muted-foreground flex justify-between text-xs">
          <div>{firstReleaseDate?.split('-')[0]}</div>
          <MovieRating average={data.vote_average} />
        </div>
      </div>
    </Link>
  )
}
