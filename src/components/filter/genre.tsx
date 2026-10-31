import { TMDB_MOVIE_GENRES, TMDB_TV_GENRES } from '@/lib/tmdb'
import { usePathname } from 'next/navigation'
import type { Dispatch, SetStateAction } from 'react'
import { Button } from '../ui/button'
import { type TFilterData } from './filter-bar'

export default function FilterGenre({ filter, setFilter }: { filter: TFilterData; setFilter: Dispatch<SetStateAction<TFilterData>> }) {
  const pathname = usePathname()
  const genres = pathname === '/tv-shows' ? TMDB_TV_GENRES : TMDB_MOVIE_GENRES

  function handleClick(id: string) {
    setFilter((f) => ({ ...f, genres: f.genres.includes(id) ? f.genres.filter((g) => g != id) : [id, ...f.genres] }))
  }

  return (
    <div>
      <h3>Genre</h3>
      <ul className="flex flex-wrap gap-1">
        {genres.map((genre) => {
          const id = String(genre.id)
          return (
            <li key={genre.id}>
              <Button variant={filter.genres.includes(id) ? 'default' : 'accentMuted'} size="sm" onClick={() => handleClick(id)}>
                {genre.name}
              </Button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
