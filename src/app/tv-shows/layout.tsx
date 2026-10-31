import { FilterBar, FilterBarDialog, FilterBarTrigger, FilterSidebarContent } from '@/components/filter/dialog'
import { SidebarIcon, Wand2Icon, XIcon } from 'lucide-react'
import { Suspense } from 'react'

export default function TvShowsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<p>tv layout loading suspense</p>}>
      <FilterBar mediaType="tv">
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
            <h1 className="mb-2 text-3xl font-semibold">Discover Tv Shows</h1>
            <p className="sm-muted mb-6">Find shows worth watching.</p>

            <FilterBarDialog />
          </header>

          {children}
        </section>
      </FilterBar>
    </Suspense>
  )
}
