import useDebounce from '@/hooks/use-debounce'
import { clientFetch } from '@/lib/client-fetcher'
import { useQuery } from '@tanstack/react-query'
import { Command as CommandPrimitive } from 'cmdk'
import { XIcon } from 'lucide-react'
import { useRef, useState, type Dispatch, type SetStateAction } from 'react'
import { Badge } from '../ui/badge'
import { Command, CommandEmpty, CommandItem, CommandList } from '../ui/command'
import { Skeleton } from '../ui/skeleton'
import { Spinner } from '../ui/spinner'
import type { TFilterData } from './dialog'
import { keywordSchema } from '@/schema & types/params'

type Tag = { id: number; name: string }

export default function FilterKeywords({ filter, setFilter }: { filter: TFilterData; setFilter: Dispatch<SetStateAction<TFilterData>> }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, value, setValue] = useDebounce()
  const [open, setOpen] = useState(false)

  const tags = parseKeywords(filter.keywords)
  const setTags = (values: Tag[]) => setFilter((f) => ({ ...f, keywords: values.map((v) => `${v.id}-${v.name}`) }))

  const addTag = (newTag: Tag) => {
    setTags([...tags, newTag])
    setValue('')
    inputRef.current?.focus()
  }

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index))
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = inputRef.current
    if (!input) return

    if (e.key === 'Backspace' && !input.value) {
      setTags(tags.slice(0, -1))
    }

    if (e.key === 'Escape') {
      setOpen(false)
      input.blur()
    }
  }

  const { data, isFetching } = useQuery({
    queryKey: ['search-keywords', query],
    queryFn: () => clientFetch<{ results: Tag[] }>(`/api/search/keyword?query=${query}`),
    enabled: !!query,
  })

  const options = (data?.results ?? []).filter((r) => !tags.some((t) => t.id === r.id))

  const isPending = value !== query || isFetching
  const hasSearched = !!query && data !== undefined
  const showlist = open && !!value

  return (
    <div>
      <h3>Keywords</h3>

      <div className="relative">
        <Command
          shouldFilter={false}
          onKeyDown={handleKeyDown}
          className="ring-ring bg-background ring-offset-background border p-2 ring-offset-2 focus-within:ring"
        >
          <div className="flex flex-wrap gap-1.5 text-sm">
            {tags.map((tag, i) => (
              <Badge variant="secondary" className="max-w-full" key={tag.id}>
                <div className="overflow-hidden text-ellipsis">{tag.name}</div>
                <button aria-label={`remove tag ${tag.name}`} onClick={() => removeTag(i)}>
                  <XIcon className="size-4" />
                </button>
              </Badge>
            ))}

            <CommandPrimitive.Input
              ref={inputRef}
              value={value}
              onValueChange={(v) => {
                setValue(v)
                setOpen(true)
              }}
              onFocus={() => setOpen(true)}
              onBlur={() => setOpen(false)}
              placeholder={tags.length > 0 ? '' : 'Add a keyword and choose one'}
              className="min-w-10 flex-1 pr-0 outline-none"
            />

            {isFetching && <Spinner className="inline" />}
          </div>

          {showlist && (
            <CommandList
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              className="bg-popover absolute bottom-full left-0 z-60 mb-2 w-full rounded-lg border shadow-lg"
            >
              {options.map((tag) => (
                <CommandItem key={tag.id} onSelect={() => addTag(tag)}>
                  {tag.name}
                </CommandItem>
              ))}

              {isPending || !hasSearched ? (
                <div className="space-y-1 p-2">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-7 w-full" />
                  ))}
                </div>
              ) : (
                <CommandEmpty>No keywords found.</CommandEmpty>
              )}
            </CommandList>
          )}
        </Command>
      </div>
    </div>
  )
}

function parseKeywords(raw: string | string[] | undefined) {
  const list = raw === undefined ? [] : Array.isArray(raw) ? raw : [raw]
  return list.flatMap((item) => {
    const r = keywordSchema.safeParse(item)
    return r.success ? [r.data] : []
  })
}
