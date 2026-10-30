import type { Dispatch, SetStateAction } from 'react'
import { Button } from '../ui/button'
import type { TFilterData } from './dialog'

export default function FilterGenre({ filter, setFilter }: { filter: TFilterData; setFilter: Dispatch<SetStateAction<TFilterData>> }) {
  function handleClick(id: string) {
    setFilter((f) => ({ ...f, genres: f.genres.includes(id) ? f.genres.filter((g) => g != id) : [id, ...f.genres] }))
  }

  return (
    <div>
      <h3>Genre</h3>
      <ul className="flex flex-wrap gap-1">
        {GENRES.map((genre) => {
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

const GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
]
