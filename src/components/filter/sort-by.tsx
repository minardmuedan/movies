import { TMDB_MOVIE_SORT_BY, TMDB_TV_SORT_BY } from '@/lib/tmdb'
import { ArrowDownIcon, ArrowUpIcon, ChevronDownIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { type Dispatch, type SetStateAction } from 'react'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import type { TFilterData } from './filter-bar'

type TOrder = 'asc' | 'desc'

export default function FilterSortBy({ filter, setFilter }: { filter: TFilterData; setFilter: Dispatch<SetStateAction<TFilterData>> }) {
  const pathname = usePathname()
  const SORT_BY = pathname === '/tv-shows' ? TMDB_TV_SORT_BY : TMDB_MOVIE_SORT_BY

  const SORT_KEYS = [...new Set(SORT_BY.map((v) => v.split('.')[0]))]

  const [currentKey, currentOrder] = filter.sortby.split('.') as [string, TOrder]

  const handleSelect = (key: string) => {
    const order: TOrder = key === currentKey ? (currentOrder === 'desc' ? 'asc' : 'desc') : 'desc'
    setFilter((f) => ({ ...f, sortby: generateSortby(key, order) }))
  }

  return (
    <div>
      <h3>Sort by</h3>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" />} className="w-full justify-between">
          <div className="[&>svg]:text-muted-foreground flex items-center gap-2">
            <div>{getSortByTitle(currentKey)}</div>
            <OrderByArrow order={currentOrder} />
          </div>
          <ChevronDownIcon />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="overflow-hidden p-0">
          <div className="max-h-(--available-height) overflow-y-auto p-1">
            {SORT_KEYS.map((key) => {
              const isActive = key === currentKey
              return (
                <DropdownMenuItem
                  key={key}
                  onClick={() => handleSelect(key)}
                  className={`flex items-center justify-between ${isActive ? 'bg-primary/50' : ''}`}
                >
                  {getSortByTitle(key)}
                  {isActive && <OrderByArrow order={currentOrder} />}
                </DropdownMenuItem>
              )
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
const OrderByArrow = ({ order }: { order: TOrder }) => (order === 'asc' ? <ArrowUpIcon /> : <ArrowDownIcon />)

const generateSortby = (key: string, order: 'asc' | 'desc') => `${key}.${order}`

const getSortByTitle = (sortby: string) => {
  const title = sortby.split('.')[0]
  const words = title.split('_')
  return words.map((p) => `${p.split('')[0].toUpperCase()}${p.split('').slice(1).join('')} `)
}
