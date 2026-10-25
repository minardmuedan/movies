import { FilterBar, FilterBarDialog, FilterBarTrigger, FilterSidebarContent } from '@/components/medias/filter-media'
import { SidebarIcon, Wand2Icon, XIcon } from 'lucide-react'

export default function MoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <FilterBar>
      <aside className="max-lg:hidden">
        <FilterSidebarContent />
      </aside>

      <section className="flex-1">
        <FilterBarTrigger className="max-lg:hidden">
          <div className="mr-2 h-full content-center border-r pr-2">
            <SidebarIcon className="group-aria-expanded:hidden" />
            <XIcon className="hidden group-aria-expanded:block" />
          </div>
          <Wand2Icon />
          Filter
        </FilterBarTrigger>

        <header className="my-12 flex flex-col max-lg:text-center">
          <h1 className="mb-2 text-3xl font-semibold">Now Playing Movies</h1>
          <p className="sm-muted mb-6">Catch the latest movies currently showing in theaters</p>

          <FilterBarDialog />
        </header>

        {children}
      </section>
    </FilterBar>
  )
}
