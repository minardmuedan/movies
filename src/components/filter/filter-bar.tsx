'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { looseEqual } from '@/lib/utils'
import { cn } from 'cn'
import { Undo2Icon, Wand2Icon, XIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createContext, useContext, useState, type Dispatch, type SetStateAction } from 'react'
import { Button } from '../ui/button'
import FilterGenre from './genre'
import FilterKeywords from './keywords'
import FilterLanguage from './language'
import FilterRatings from './ratings'

type TFilterData = { genres: string[]; ratings: string; language: string; keywords: string[] }

type Ctx = { sidebarOpen: boolean; toggleSidebarOpen: () => void }
const context = createContext<Ctx | null>(null)

const useFilterBarContext = () => {
  const filterBarContext = useContext(context)
  if (!filterBarContext) throw 'Filter bar must be used inside its parent'
  return filterBarContext
}

const useFilterSearchParams = () => {
  const searchParams = useSearchParams()
  return {
    genres: searchParams.getAll('genres'),
    ratings: searchParams.get('ratings') || '0-10',
    language: searchParams.get('language') || 'en',
    keywords: searchParams.getAll('keywords'),
  }
}

const FilterBar = ({ defaultOpen, children }: { defaultOpen: boolean; children: React.ReactNode }) => {
  const { genres, ratings, language, keywords } = useFilterSearchParams()
  const shouldOpen = defaultOpen || genres.length > 0 || ratings !== '0-10' || language !== 'en' || keywords.length > 0
  const [sidebarOpen, setCollapsed] = useState(shouldOpen)

  const toggleSidebarOpen = () =>
    setCollapsed((prev) => {
      const next = !prev
      document.cookie = `filter-sidebar=${next ? 'open' : 'closed'}; path=/; max-age=31536000; SameSite=Lax`
      return next
    })

  return (
    <context.Provider value={{ sidebarOpen, toggleSidebarOpen }}>
      <div aria-expanded={sidebarOpen} className="group flex">
        {children}
      </div>
    </context.Provider>
  )
}

const FilterBarTrigger = ({ variant = 'accentMuted', children, className, ...props }: React.ComponentProps<typeof Button>) => {
  const { toggleSidebarOpen } = useFilterBarContext()

  return (
    <Button variant={variant} onClick={toggleSidebarOpen} {...props} className={`relative ${className}`}>
      {children} <FilterCount />
    </Button>
  )
}

const FilterBarContent = ({ onSave }: { onSave?: () => void }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParamsFilter = useFilterSearchParams()

  const [filter, setFilter] = useState<TFilterData>(searchParamsFilter)
  const [prevFilter, setPrevFilter] = useState<TFilterData | undefined>(undefined)

  const hasFilter = filter.genres.length > 0 || filter.ratings !== '0-10' || filter.language !== 'en' || filter.keywords.length > 0

  function handleFilter() {
    const params = new URLSearchParams()

    Object.entries(filter).map(([key, value]) => {
      if (Array.isArray(value)) value.map((v) => params.append(key, v))
      else {
        if ((key === 'language' && value === 'en') || (key === 'ratings' && value === '0-10')) return
        params.set(key, value)
      }
    })

    onSave?.()
    setPrevFilter(undefined)
    router.replace(`${pathname}?${params}`)
  }

  function clearFilter() {
    setPrevFilter(filter)
    setFilter({ genres: [], ratings: '0-10', language: 'en', keywords: [] })
  }

  function undoClearFilter() {
    setFilter(prevFilter!)
    setPrevFilter(undefined)
  }

  return (
    <div className="overflow-y-auto">
      <div className="[&_h3]:text-muted-foreground mb-6 space-y-12 px-6 pt-2 [&_h3]:mb-2">
        <FilterGenre filter={filter} setFilter={setFilter} />
        <FilterRatings filter={filter} setFilter={setFilter} />
        <FilterLanguage filter={filter} setFilter={setFilter} />
        <FilterKeywords filter={filter} setFilter={setFilter} />
      </div>

      <div aria-label="filter-actions" className="bg-background sticky bottom-0 z-50 mx-6 space-y-2 pt-3 pb-6 *:pointer-events-auto *:w-full">
        {!prevFilter && hasFilter && (
          <Button variant="outline" onClick={clearFilter}>
            Clear All Filter
          </Button>
        )}

        {prevFilter && (
          <Button variant="outline" onClick={undoClearFilter}>
            <Undo2Icon /> Undo Clear
          </Button>
        )}

        <Button disabled={looseEqual(searchParamsFilter, filter)} onClick={handleFilter}>
          Save Changes
        </Button>
      </div>
    </div>
  )
}

const FilterSidebarContent = () => {
  const { sidebarOpen } = useFilterBarContext()

  return (
    <div
      inert={!sidebarOpen}
      style={{ width: sidebarOpen ? 300 + 24 : 0 }}
      className="sticky top-14 overflow-hidden transition-[width] duration-300 ease-out"
    >
      <div className="bg-background/50 mr-6 flex h-[calc(100svh-4rem)] min-w-75 flex-col rounded-xl border backdrop-blur-sm">
        <div className="relative flex justify-between border-b p-6 pb-3">
          <div>
            <h2 className="text-lg">Filters</h2>
            <div className="sm-muted">Customize the experience</div>
          </div>

          <FilterBarTrigger variant="ghost" size="icon-sm" className="absolute top-3 right-3 [&>span[aria-label='filter-count']]:sr-only">
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
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" className="relative mx-auto w-3/4 lg:hidden" />}>
        Filter
        <Wand2Icon />
        <FilterCount />
      </DialogTrigger>

      <DialogContent className="**:aria-[label='filter-actions']:bg-popover">
        <DialogHeader className="border-b pb-3">
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>Customize the experience</DialogDescription>
        </DialogHeader>

        <FilterBarContent onSave={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

const FilterCount = () => {
  let count = 0
  const searchParamsFilter = useFilterSearchParams()

  Object.entries(searchParamsFilter).map(([k, v]) => {
    if ((k === 'language' && v === 'en') || (k === 'ratings' && v === '0-10')) return
    if (Array.isArray(v)) count += v.length
    else if (!!v) count += 1
  })

  if (count > 0)
    return (
      <span
        aria-label="filter-count"
        className="text-primary bg-accent border-primary absolute -top-3 -right-3 grid size-6 place-items-center rounded-full border"
      >
        {count}
      </span>
    )
}

export { FilterBar, FilterBarContent, FilterBarDialog, FilterBarTrigger, FilterSidebarContent, useFilterBarContext, type TFilterData }
