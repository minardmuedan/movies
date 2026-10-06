import { Button } from '@/components/ui/button'
import { TMDBFetch } from '@/lib/fetcher'
import { TGenres } from '@/types/tmdb'

export default async function MoviesSideNav() {
  const result = await TMDBFetch<TGenres>('/genre/movie/list')

  if (!result.isSuccess) return <p>error</p>
  return (
    <aside className="bg-background/50 hidden w-full max-w-72 space-y-6 rounded-xl p-6 md:block">
      Filters
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
  )
}
