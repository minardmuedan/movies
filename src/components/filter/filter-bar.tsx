'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { type TTMDB_SORT_BY } from '@/lib/tmdb'
import { looseEqual } from '@/lib/utils'
import { sortbySchema } from '@/schema & types/params'
import { Undo2Icon, Wand2Icon, XIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'
import FilterGenre from './genre'
import FilterKeywords from './keywords'
import FilterLanguage from './language'
import FilterRatings from './ratings'
import FilterSortBy from './sort-by'

const COOKIE_KEY = 'filterbar'
type TFilterData = { sortby: TTMDB_SORT_BY[number]; genres: string[]; ratings: string; language: string; keywords: string[] }

const useFilterSearchParams = (): TFilterData => {
  const searchParams = useSearchParams()
  return {
    sortby: sortbySchema.parse(searchParams.get('sortby')),
    genres: searchParams.getAll('genres'),
    ratings: searchParams.get('ratings') || '0-10',
    language: searchParams.get('language') || 'en',
    keywords: searchParams.getAll('keywords'),
  }
}

const checkHasFilter = (f: TFilterData) =>
  f.sortby !== 'popularity.desc' || f.genres.length > 0 || f.ratings !== '0-10' || f.language !== 'en' || f.keywords.length > 0

const FilterBarTrigger = ({ variant = 'accentMuted', children, className, ...props }: React.ComponentProps<typeof Button>) => {
  const toggleSidebarOpen = () => {
    const el = document.documentElement
    const next = el.dataset.filterbar === 'open' ? 'closed' : 'open'
    el.dataset.filterbar = next
    document.cookie = `${COOKIE_KEY}=${next}; path=/; max-age=31536000`
  }

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

  const hasFilter = checkHasFilter(filter)

  function handleFilter() {
    const params = new URLSearchParams()

    Object.entries(filter).map(([key, value]) => {
      if (Array.isArray(value)) value.map((v) => params.append(key, v))
      else {
        if (key === 'language' && value === 'en') return
        if (key === 'ratings' && value === '0-10') return
        if (key === 'sortby' && value === 'popularity.desc') return
        params.set(key, value)
      }
    })

    onSave?.()
    setPrevFilter(undefined)
    router.replace(`${pathname}?${params}`)
  }

  function clearFilter() {
    setPrevFilter(filter)
    setFilter({ sortby: 'popularity.desc', genres: [], ratings: '0-10', language: 'en', keywords: [] })
  }

  function undoClearFilter() {
    setFilter(prevFilter!)
    setPrevFilter(undefined)
  }

  return (
    <div className="overflow-y-auto">
      <div className="[&_h3]:text-muted-foreground mb-6 space-y-12 px-6 pt-2 [&_h3]:mb-2">
        <FilterSortBy filter={filter} setFilter={setFilter} />
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
  return (
    <div className={`sticky top-14 w-81 overflow-hidden transition-[width] duration-300 ease-out [html[data-filterbar=closed]_&]:w-0!`}>
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
    if (k === 'language' && v === 'en') return
    if (k === 'ratings' && v === '0-10') return
    if (k === 'sortby' && v === 'popularity.desc') return
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

export { FilterBarContent, FilterBarDialog, FilterBarTrigger, FilterSidebarContent, type TFilterData }
