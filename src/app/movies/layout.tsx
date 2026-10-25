import { FilterBar, FilterBarContent, FilterBarTrigger, FilterSidebarContent } from '@/components/medias/filter-media'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { SidebarIcon, Wand2Icon, XIcon } from 'lucide-react'

export default function MoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <FilterBar>
      <div className="flex">
        <aside className="max-lg:hidden">
          <FilterSidebarContent />
        </aside>

        <section className="flex-1">
          <FilterBarTrigger className="group max-lg:hidden">
            <div className="mr-2 h-full content-center border-r pr-2">
              <SidebarIcon className="group-aria-expanded:hidden" />
              <XIcon className="hidden group-aria-expanded:block" />
            </div>
            <Wand2Icon />
            Filters
          </FilterBarTrigger>

          <header className="flex flex-col">
            <h1 className="mt-12 text-3xl font-semibold">Now Playing Movies</h1>
            <p className="sm-muted mb-12">Catch the latest movies currently showing in theaters</p>

            <Dialog>
              <DialogTrigger render={<Button variant="accentMuted" className="mb-2 ml-auto lg:hidden" />}>
                <Wand2Icon />
                Filters
              </DialogTrigger>

              <DialogContent>
                <DialogHeader className="border-b pb-3">
                  <DialogTitle>Filter</DialogTitle>
                  <DialogDescription>Customize the experience</DialogDescription>
                </DialogHeader>

                <FilterBarContent className="p-3" />
              </DialogContent>
            </Dialog>
          </header>

          {children}
        </section>
      </div>
    </FilterBar>
  )
}
