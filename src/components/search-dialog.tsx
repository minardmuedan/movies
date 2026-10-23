'use client'

import useDebounce from '@/hooks/use-debounce'
import { TMDB_MEDIA, type TTMDB_MEDIA } from '@/lib/tmdb'
import { useInfiniteQuery } from '@tanstack/react-query'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import TMDBImage from './image'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group'
import { ScrollArea } from './ui/scroll-area'

const fetchProjects = async (mediaType: string, query: string, pageParam: number) => {
  if (!query) return
  const res = await fetch(`/api/search?media_type=${mediaType}&query=${query}&page=${pageParam}`)
  return (await res.json()) as { d: '' }
}

export default function SearchDialog({ defaultMediaType = 'movie' }: { defaultMediaType?: TTMDB_MEDIA }) {
  const [mediaType, setMediaType] = useState(defaultMediaType)
  const [query, value, setValue] = useDebounce()

  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ['search', mediaType, query],
    queryFn: ({ pageParam }) => fetchProjects(mediaType, query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (_lastPage, _pages, lastPageParam) => lastPageParam + 1,
    enabled: !!query,
  })

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />} className="w-fit justify-start md:w-52">
        <SearchIcon /> <span className="sr-only md:not-sr-only">Search</span>
      </DialogTrigger>

      <DialogContent className="max-h-full max-w-full">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>Have anything in mind?</DialogDescription>
        </DialogHeader>

        <ScrollArea className="px-3 pt-0 pb-6">
          <div className="*:border-border mb-6 grid grid-cols-3 overflow-hidden rounded-md border *:rounded-none *:border-0 *:border-r *:last-of-type:border-r-0">
            {TMDB_MEDIA.map((media) => (
              <Button key={media} variant={mediaType === media ? 'default' : 'ghost'} onClick={() => setMediaType(media)}>
                <span className="first-letter:uppercase">{media}</span>
              </Button>
            ))}
          </div>

          <InputGroup>
            <InputGroupInput autoFocus placeholder={`Search a ${mediaType}...`} value={value} onChange={(e) => setValue(e.target.value)} />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>

          {isLoading && (
            <ul className="mt-6 space-y-2">
              {[...Array(3)].map((_, i) => (
                <li key={i} className="flex h-20 gap-2 rounded border p-2">
                  <div className="bg-accent aspect-2/3 h-full" />

                  <div className="*:bg-accent">
                    <div className="mb-2 h-5 w-40"></div>
                    <div className="mb-0.5 h-4 w-60"></div>
                    <div className="h-4 w-40"></div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {!isLoading && data && (
            <ul className="mt-6 space-y-2">
              {data.pages[0]?.results.map((movie, i) => (
                <li key={i} className="flex h-20 gap-2 rounded border p-2">
                  <TMDBImage type="poster" src={movie.poster_path} alt="" className="aspect-2/3 h-full" />

                  <div className="flex-1">
                    <div className="text-sm">{movie.title}</div>
                    <div className="xs-muted line-clamp-2">{movie.overview}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
