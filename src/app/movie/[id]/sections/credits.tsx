import TMDBImage from '@/components/image'
import { TMDBFetch } from '@/lib/fetcher'
import type { TMovieCredits } from '@/types/tmdb'

export default async function MovieCredits({ id }: { id: string }) {
  const credits = await TMDBFetch<TMovieCredits>(`https://api.themoviedb.org/3/movie/${id}/credits`)
  return (
    <section>
      <h3>
        Cast <span>{credits.cast.length}</span>
      </h3>

      <ul className="flex max-w-svw gap-6 overflow-x-hidden border">
        {credits.cast.map((credit) => (
          <li key={credit.id} className="text-center text-sm">
            <TMDBImage type="profile" src={credit.profile_path} alt="" className="mb-2 size-28 shrink-0 rounded-full" />
            <div>{credit.name}</div>
            <div className="xs-muted">{credit.character}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
