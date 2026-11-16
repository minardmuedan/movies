import { FilterBarContextProvider, FilterBarDialog, FilterBarTrigger, FilterSidebarContent } from '@/components/filter/filter-bar'
import { SidebarIcon, Wand2Icon, XIcon } from 'lucide-react'

export const instant = false

export default function DiscoverMoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <FilterBarContextProvider>
      <aside className="max-lg:hidden">
        <FilterSidebarContent />
      </aside>

      <section className="flex-1">
        <FilterBarTrigger className="max-lg:hidden">
          <div className="mr-2 h-full content-center border-r pr-2">
            <SidebarIcon className="in-aria-expanded:hidden" />
            <XIcon className="hidden in-aria-expanded:block" />
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
    </FilterBarContextProvider>
  )
}
