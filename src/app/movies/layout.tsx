import { FilterBarDialog, FilterBarTrigger, FilterSidebarContent } from '@/components/filter/filter-bar'
import { SidebarIcon, Wand2Icon, XIcon } from 'lucide-react'
import { Suspense } from 'react'

export default function MoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="flex [&_.media-card-container]:[html[data-filterbar=open]_&]:lg:grid-cols-3 [&_.media-card-container]:[html[data-filterbar=open]_&]:xl:grid-cols-4 [&_.media-card-container]:[html[data-filterbar=open]_&]:2xl:grid-cols-5">
        <aside className="max-lg:hidden">
          <FilterSidebarContent />
        </aside>

        <section className="flex-1">
          <FilterBarTrigger className="max-lg:hidden">
            <div className="mr-2 h-full content-center border-r pr-2">
              <SidebarIcon className="[html[data-filterbar=open]_&]:hidden" />
              <XIcon className="hidden [html[data-filterbar=open]_&]:block" />
            </div>
            <Wand2Icon />
            Filter
          </FilterBarTrigger>

          <header className="my-12 flex flex-col max-lg:text-center">
            <h1 className="mb-2 text-3xl font-semibold">Explore Movies</h1>
            <p className="sm-muted mb-6">Discover something new to watch.</p>

            <FilterBarDialog />
          </header>

          {children}
        </section>
      </div>
    </Suspense>
  )
}
