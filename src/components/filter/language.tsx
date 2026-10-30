import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDownIcon } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import type { TFilterData } from './dialog'
import { TMDB_LANGUAGE } from '@/lib/tmdb'

export default function FilterLanguage({ filter, setFilter }: { filter: TFilterData; setFilter: Dispatch<SetStateAction<TFilterData>> }) {
  return (
    <div>
      <h3>Language</h3>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" />} className="w-full justify-between">
          <div>
            Language
            <span className="sm-muted"> ({TMDB_LANGUAGE.find(({ iso_639_1 }) => iso_639_1 == filter.language)?.english_name})</span>
          </div>
          <ChevronDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="overflow-hidden p-0">
          <ScrollArea className="max-h-(--available-height) p-1">
            {[
              TMDB_LANGUAGE.sort((a, b) => a.english_name.localeCompare(b.english_name)).map(({ iso_639_1, english_name }) => (
                <DropdownMenuItem
                  key={iso_639_1}
                  onClick={() => setFilter((f) => ({ ...f, language: iso_639_1 }))}
                  className={`flex items-center justify-between ${filter.language === iso_639_1 ? 'bg-primary/50 pointer-events-none' : ''}`}
                >
                  <div>{english_name}</div>
                  <span className="xs-muted">{iso_639_1}</span>
                </DropdownMenuItem>
              )),
            ]}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
