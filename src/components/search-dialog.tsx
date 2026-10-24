'use client'

import useDebounce from '@/hooks/use-debounce'
import { clientFetch } from '@/lib/client-fetcher'
import { TMDB_MEDIA, type TTMDB_MEDIA } from '@/lib/tmdb'
import type { TMovies, TPersons, TTvShows } from '@/types/tmdb'
import { useInfiniteQuery } from '@tanstack/react-query'
import { PlayIcon, SearchIcon } from 'lucide-react'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { InView } from 'react-intersection-observer'
import TMDBImage from './image'
import { MediaRating } from './medias/media-rating'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group'
import { ScrollArea } from './ui/scroll-area'
import { Skeleton } from './ui/skeleton'
import { Spinner } from './ui/spinner'
import Link from 'next/link'

type Props = { defaultMediaType?: TTMDB_MEDIA }

export default function SearchDialog(props: Props) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />} className="w-fit justify-start md:w-52">
        <SearchIcon /> <span className="sr-only md:not-sr-only">Search</span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>Have anything in mind?</DialogDescription>
        </DialogHeader>

        <SearchContent defaultMediaType={props.defaultMediaType} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}

export function SearchContent({ defaultMediaType = 'movie', setOpen }: Props & { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const [mediaType, setMediaType] = useState(defaultMediaType)
  const [query, value, setValue] = useDebounce()

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['search', mediaType, query],
    queryFn: ({ pageParam }) => clientFetch<TMovies | TTvShows | TPersons>(`/api/search?media_type=${mediaType}&query=${query}&page=${pageParam}`),
    initialPageParam: 1,
    getNextPageParam: (lastData, _pages, prevPage) => {
      if (lastData?.total_pages && prevPage < lastData.total_pages) return prevPage + 1
      return undefined
    },
    enabled: !!query,
  })

  const totalResult = data?.pages[0]?.total_results
  const results = data?.pages.map((results) => (results ? results.results : [])).flat()

  return (
    <ScrollArea className="px-3 pt-0 pb-6 *:space-y-6">
      <div className="*:border-border grid grid-cols-3 overflow-hidden rounded-md border *:rounded-none *:border-0 *:border-r *:last-of-type:border-r-0">
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

      {!isLoading && query && <div className="xs-muted mb-1 text-center">{totalResult ? `${totalResult} results` : 'no result'}</div>}

      {query && (
        <ul className="*:*:accent-muted space-y-2 *:*:flex *:*:h-24 *:*:gap-2 *:*:rounded *:*:p-2">
          {results?.map((data, i) => {
            const name = 'title' in data ? data.title : data.name
            const imagePath = 'poster_path' in data ? data.poster_path : data.profile_path
            const imageType = 'poster' in data ? 'poster' : 'profile'
            const voteAverage = 'vote_average' in data && data.vote_average
            const releaseDate = 'release_date' in data && data.release_date.split('-')[0]
            const personKnownFor = 'known_for' in data ? data.known_for : []

            return (
              <li key={i}>
                <Link href={`/${mediaType}/${data.id}`} onClick={() => setOpen(false)}>
                  <TMDBImage type={imageType} src={imagePath} alt="" className="aspect-2/3 h-full" />

                  <div className="flex-1">
                    <div className="mb-1 line-clamp-1 text-sm">{name}</div>
                    {'overview' in data && <div className="xs-muted line-clamp-2">{data.overview || 'no overview'}</div>}

                    <div className="mt-2 flex items-center gap-2">
                      {!!releaseDate && <div className="xs-muted">{releaseDate}</div>}
                      {!!voteAverage && <MediaRating average={voteAverage} />}

                      {personKnownFor.length > 0 && (
                        <div className="xs-muted flex gap-1">
                          <PlayIcon className="size-4" />
                          <p className="line-clamp-3 flex-1">{personKnownFor.map((v) => ('title' in v ? v.title : v.name)).join(', ')}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}

          {query &&
            isFetching &&
            [...Array(3)].map((_, i) => (
              <li key={i}>
                <div className="pointer-events-none">
                  <Skeleton className="aspect-2/3 h-full" />

                  <div className="flex-1">
                    <Skeleton className="mb-2 h-4 w-1/2" />
                    <Skeleton className="mb-1 h-3 w-4/5" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}

      {query && !isFetching && hasNextPage && (
        <InView onChange={(inView) => inView && !isFetching && fetchNextPage()} className="flex justify-center">
          <Spinner />
        </InView>
      )}
    </ScrollArea>
  )
}
