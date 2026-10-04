import { Button } from '@/components/ui/button'
import { TMDBFetch } from '@/lib/fetcher'
import { TGenres } from '@/types/tmdb'

export default async function MoviesSideNav() {
  const result = await TMDBFetch<TGenres>('/genre/movie/list')

  if (!result.isSuccess) return <p>error</p>
  return (
    <div className="flex gap-3 py-6">
      <aside className="w-full max-w-72 space-y-6 border p-6">
        <div>
          <div className="text-muted-foreground mb-2 font-medium">Genres</div>
          <ul className="flex flex-wrap gap-1">
            {result.data.genres.map((genre) => (
              <li key={genre.id}>
                <Button size="sm" variant="outline">
                  {genre.name}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}
