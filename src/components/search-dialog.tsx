'use client'

import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import useDebounce from '@/hooks/use-debounce'
import { clientFetch } from '@/lib/client-fetcher'
import { TMDB_MEDIA, type TTMDB_MEDIA } from '@/lib/tmdb'
import type { TMovies, TPersons, TTvShows } from '@/schema & types/tmdb'
import { useInfiniteQuery } from '@tanstack/react-query'
import { PlayIcon, SearchIcon } from 'lucide-react'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { InView } from 'react-intersection-observer'
import TMDBImage from './image'
import { MediaRating } from './medias/media-rating'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { Spinner } from './ui/spinner'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = { defaultMediaType?: TTMDB_MEDIA }

export default function SearchDialog(props: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => setOpen(true)} variant="outline" className="w-fit justify-start md:w-52">
        <SearchIcon /> <span className="sr-only md:not-sr-only">Search</span>
      </Button>

      <CommandDialog title="Search" description="Have anything in mind?" open={open} onOpenChange={setOpen}>
        <CommandContent defaultMediaType="movie" setOpen={setOpen} />
      </CommandDialog>
    </div>
  )
}

function CommandContent({ defaultMediaType = 'movie', setOpen }: Props & { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const router = useRouter()
  const [mediaType, setMediaType] = useState(defaultMediaType)
  const [query, value, setValue] = useDebounce()

  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['search', mediaType, query],
    queryFn: ({ pageParam }) => clientFetch<TMovies | TTvShows | TPersons>(`/api/search?media_type=${mediaType}&query=${query}&page=${pageParam}`),
    initialPageParam: 1,
    getNextPageParam: (lastData, _pages, prevPage) => {
      if (lastData?.total_pages && prevPage < lastData.total_pages) return prevPage + 1
      return undefined
    },
    enabled: !!query,
  })

  const results = data?.pages.map((d) => {
    if (!d) return []
    return d.results.map(
      (data) =>
        ({
          name: 'title' in data ? data.title : data.name,
          imagePath: 'poster_path' in data ? data.poster_path : data.profile_path,
          imageType: 'poster' in data ? 'poster' : 'profile',
          voteAverage: ('vote_average' in data && data.vote_average) || 0,
          releaseDate: 'release_date' in data && data.release_date.split('-')[0],
          personKnownFor: 'known_for' in data ? data.known_for : [],
          ...data,
        }) as const,
    )
  })

  const totalResult = data?.pages[0]?.total_results || 0

  const noResult = !isFetching && totalResult === 0
  const showFallback = query && isFetching
  const showSpinner = query && !isFetching && hasNextPage

  return (
    <>
      <nav className="flex gap-1 px-2 pt-2">
        {TMDB_MEDIA.map((media) => (
          <Button key={media} variant={mediaType === media ? 'default' : 'outline'} onClick={() => setMediaType(media)}>
            <span className="first-letter:uppercase">{media}</span>
          </Button>
        ))}
      </nav>

      <Command shouldFilter={false}>
        <CommandInput placeholder={`Search a ${mediaType}...`} value={value} onValueChange={setValue} />

        <CommandList className="max-h-full **:data-[slot=command-item]:mb-2 **:data-[slot=command-item]:h-24 **:data-[slot=command-item]:gap-3 **:data-[slot=command-item]:border">
          {query && (
            <CommandGroup heading={noResult || isFetching ? undefined : `${totalResult} results`} className="gap-2">
              {results?.flat().map((data, i) => {
                const { name, imagePath, imageType, personKnownFor, releaseDate, voteAverage } = data
                const href = `/${mediaType}/${data.id}`
                return (
                  <CommandItem
                    key={i}
                    onSelect={() => {
                      router.push(href)
                      setOpen(false)
                    }}
                    asChild
                    className="bg-input/20 hover:ring-ring/75 cursor-pointer data-selected:ring"
                  >
                    <Link href={href}>
                      <TMDBImage type={imageType} src={imagePath} alt="" className="aspect-2/3 h-full rounded" />

                      <div className="flex-1">
                        <div className="mb-1 line-clamp-1 text-sm">{name}</div>
                        {'overview' in data && <div className="xs-muted line-clamp-2">{data.overview || 'no overview'}</div>}

                        <div className="mt-2 flex items-center gap-2">
                          {!!releaseDate && <div className="xs-muted">{releaseDate}</div>}
                          <MediaRating average={voteAverage} />

                          {personKnownFor.length > 0 && (
                            <div className="xs-muted flex gap-1">
                              <PlayIcon className="size-4" />
                              <p className="line-clamp-3 flex-1">{personKnownFor.map((v) => ('title' in v ? v.title : v.name)).join(', ')}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          )}

          {showFallback && <FetchingFallback />}
          {showSpinner && <FetchMore fetchNextPage={fetchNextPage} />}
          {noResult && <CommandEmpty>{query ? 'No results found.' : 'Type in some keywords'}</CommandEmpty>}
        </CommandList>
      </Command>
    </>
  )
}

function FetchMore({ fetchNextPage }: { fetchNextPage: () => void }) {
  return (
    <InView onChange={(inView) => inView && fetchNextPage()} className="flex justify-center">
      <Spinner />
    </InView>
  )
}

function FetchingFallback() {
  return [...Array(3)].map((_, i) => (
    <CommandItem key={i}>
      <Skeleton className="aspect-2/3 h-full" />

      <div className="flex-1">
        <Skeleton className="mb-2 h-4 w-1/2" />
        <Skeleton className="mb-1 h-3 w-4/5" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </CommandItem>
  ))
}
