import { FilterBar, FilterBarDialog, FilterBarTrigger, FilterSidebarContent } from '@/components/filter/filter-bar'
import { SidebarIcon, Wand2Icon, XIcon } from 'lucide-react'
import { cookies } from 'next/headers'
import { Suspense } from 'react'

export default function MoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<p>movies layout loading suspense</p>}>
      <Content>{children}</Content>
    </Suspense>
  )
}

async function Content({ children }: { children: React.ReactNode }) {
  const sidebarOpen = (await cookies()).get('filter-sidebar')?.value === 'open'

  return (
    <FilterBar defaultOpen={sidebarOpen}>
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
          <h1 className="mb-2 text-3xl font-semibold">Explore Movies</h1>
          <p className="sm-muted mb-6">Discover something new to watch.</p>

          <FilterBarDialog />
        </header>

        {children}
      </section>
    </FilterBar>
  )
}
