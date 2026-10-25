'use client'

import { ChevronDownIcon, XIcon } from 'lucide-react'
import { createContext, useContext, useState, type Dispatch, type SetStateAction } from 'react'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { Textarea } from '../ui/textarea'
import { cn } from 'cn'

type FilterBarState = { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }
const context = createContext<FilterBarState | null>(null)

const useFilterBarContext = () => {
  const filterBarContext = useContext(context)
  if (!filterBarContext) throw 'Filter bar must be used inside its parent'
  return filterBarContext
}

const FilterBar = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  return <context.Provider value={{ open, setOpen }}>{children}</context.Provider>
}

const FilterBarTrigger = ({ variant = 'accentMuted', children, ...props }: React.ComponentProps<typeof Button>) => {
  const { open, setOpen } = useFilterBarContext()

  return (
    <Button aria-expanded={open} variant={variant} onClick={() => setOpen((v) => !v)} {...props}>
      {children}
    </Button>
  )
}

const FilterBarContent = ({ className }: { className?: string }) => {
  return (
    <ScrollArea className={cn('[&_h3]:text-muted-foreground *:space-y-12 [&_h3]:mb-2', className)}>
      <div>
        <h3>Genre</h3>
        <ul className="flex flex-wrap gap-1">
          {genres.map((genre) => (
            <li key={genre.id}>
              <Button variant="accentMuted" size="sm">
                {genre.name}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Ratings</h3>
      </div>

      <div>
        <h3>Certifications</h3>
        <ul className="flex flex-wrap gap-1">
          {['NR', 'G', 'PG', 'R-13', 'R-16', 'R-18', 'X'].map((v) => (
            <li key={v}>
              <Button variant="accentMuted" size="sm">
                {v}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Language</h3>
        <Button variant="accentMuted" className="w-full justify-between">
          <div>English</div>
          <ChevronDownIcon />
        </Button>
      </div>

      <div>
        <h3>Keywords</h3>
        <Textarea placeholder="type some keyworkds" />
      </div>

      <div className="sticky bottom-0">
        <Button className="w-full">Save Changes</Button>
      </div>
    </ScrollArea>
  )
}

const FilterSidebarContent = () => {
  const { open } = useFilterBarContext()

  return (
    <div inert={!open} style={{ width: open ? 300 + 24 : 0 }} className="sticky top-14 overflow-hidden transition-[width] duration-300 ease-out">
      <div className="bg-background/50 mr-6 flex h-[calc(100svh-4rem)] min-w-75 flex-col rounded-xl border backdrop-blur-sm">
        <div className="border-b p-6 pb-3">
          <h2 className="text-xl">Filter</h2>
          <div className="sm-muted">Customize the experience</div>
        </div>

        <FilterBarContent className="p-6 pt-3" />
      </div>
    </div>
  )
}

export { FilterBar, FilterBarTrigger, FilterBarContent, FilterSidebarContent }

const genres = [
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
