'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from 'cn'
import { ChevronDownIcon, Wand2Icon, XIcon } from 'lucide-react'
import { createContext, useContext, useState, type Dispatch, type SetStateAction } from 'react'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { Textarea } from '../ui/textarea'
import { useRouter, useSearchParams } from 'next/navigation'
import { looseEqual } from '@/lib/utils'

type FilterBarState = { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }
const context = createContext<FilterBarState | null>(null)

const useFilterBarContext = () => {
  const filterBarContext = useContext(context)
  if (!filterBarContext) throw 'Filter bar must be used inside its parent'
  return filterBarContext
}

const FilterBar = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams()
  const genres = searchParams.get('genres')
  const [open, setOpen] = useState(!!genres)

  return (
    <context.Provider value={{ open, setOpen }}>
      <div aria-expanded={open} className="group flex">
        {children}
      </div>
    </context.Provider>
  )
}

const FilterBarTrigger = ({ variant = 'accentMuted', children, ...props }: React.ComponentProps<typeof Button>) => {
  const { setOpen } = useFilterBarContext()

  return (
    <Button variant={variant} onClick={() => setOpen((v) => !v)} {...props}>
      {children}
    </Button>
  )
}

const FilterBarContent = ({ className }: { className?: string }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const genres = searchParams.getAll('genres')
  const certifications = searchParams.getAll('certifications')

  const activeFilter = { genres, certifications }
  const [filter, setFilter] = useState(activeFilter)

  function handleFilter() {
    const params = new URLSearchParams()
    Object.entries(filter).map(([key, value]) => (Array.isArray(value) ? value.map((v) => params.append(key, v)) : params.set(key, value)))
    router.push(`/movies?${params}`)
  }

  const sections = [
    [
      'Genre',
      <ul className="flex flex-wrap gap-1">
        {GENRES.map((genre) => {
          const id = String(genre.id)
          return (
            <li key={genre.id}>
              <Button
                variant={filter.genres.includes(id) ? 'default' : 'accentMuted'}
                size="sm"
                onClick={() => setFilter((f) => ({ ...f, genres: f.genres.includes(id) ? f.genres.filter((g) => g != id) : [id, ...f.genres] }))}
              >
                {genre.name}
              </Button>
            </li>
          )
        })}
      </ul>,
    ],
    ['Ratings', <></>],
    [
      'Certifications',
      <ul className="flex flex-wrap gap-1">
        {['NR', 'G', 'PG', 'R-13', 'R-16', 'R-18', 'X'].map((certificate) => (
          <li key={certificate}>
            <Button
              variant={filter.certifications.includes(certificate) ? 'default' : 'accentMuted'}
              size="sm"
              onClick={() =>
                setFilter((f) => ({
                  ...f,
                  certifications: f.certifications.includes(certificate)
                    ? f.certifications.filter((c) => c != certificate)
                    : [certificate, ...f.certifications],
                }))
              }
            >
              {certificate}
            </Button>
          </li>
        ))}
      </ul>,
    ],
    [
      'Language',
      <Button variant="accentMuted" className="w-full justify-between">
        <div>English</div>
        <ChevronDownIcon />
      </Button>,
    ],
    ['Keywords', <Textarea placeholder="type some keyworkds" />],
  ]

  return (
    <ScrollArea className={cn('[&_h3]:text-muted-foreground px-6 py-3 *:space-y-12 [&_h3]:mb-2', className)}>
      {sections.map(([title, comp], i) => (
        <div key={i}>
          <h3>{title}</h3>
          {comp}
        </div>
      ))}

      {!looseEqual(activeFilter, filter) && (
        <div className="animate-in fade-in sticky bottom-0">
          <Button className="w-full" onClick={handleFilter}>
            Save Changes
          </Button>
        </div>
      )}
    </ScrollArea>
  )
}

const FilterSidebarContent = () => {
  const { open } = useFilterBarContext()

  return (
    <div inert={!open} style={{ width: open ? 300 + 24 : 0 }} className="sticky top-14 overflow-hidden transition-[width] duration-300 ease-out">
      <div className="bg-background/50 mr-6 flex h-[calc(100svh-4rem)] min-w-75 flex-col rounded-xl border backdrop-blur-sm">
        <div className="relative flex justify-between border-b p-6 pb-3">
          <div>
            <h2 className="text-lg">Filters</h2>
            <div className="sm-muted">Customize the experience</div>
          </div>

          <FilterBarTrigger variant="ghost" size="icon-sm" className="absolute top-3 right-3">
            <XIcon />
            <span className="sr-only">close the filter sidebar</span>
          </FilterBarTrigger>
        </div>

        <FilterBarContent />
      </div>
    </div>
  )
}

const FilterBarDialog = () => {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" className="mx-auto w-3/4 lg:hidden" />}>
        Filter
        <Wand2Icon />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>Customize the experience</DialogDescription>
        </DialogHeader>

        <FilterBarContent />
      </DialogContent>
    </Dialog>
  )
}

export { FilterBar, FilterBarContent, FilterBarDialog, FilterBarTrigger, FilterSidebarContent }

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
