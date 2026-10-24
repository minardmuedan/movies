'use client'

import { clientFetch } from '@/lib/client-fetcher'
import { timeAgo } from '@/lib/time-format'
import type { TMediaReviews, TReview } from '@/types/tmdb'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { InView } from 'react-intersection-observer'
import TMDBImage from '../image'
import { ScrollArea } from '../ui/scroll-area'
import { Skeleton } from '../ui/skeleton'
import { Spinner } from '../ui/spinner'

export function MediaReviews({ media, mediaId, initialData }: { media: 'movie' | 'tv'; mediaId: string; initialData: TMediaReviews }) {
  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ['reviews', mediaId, media],
    queryFn: ({ pageParam }) => clientFetch<TMediaReviews>(`/api/reviews/${mediaId}?media_type=${media}&page=${pageParam}`),
    initialPageParam: 1,
    getNextPageParam: (lastData, _pages, prevPage) => {
      if (lastData?.total_pages && prevPage < lastData.total_pages) return prevPage + 1
      return undefined
    },
    initialData: { pageParams: [1], pages: [initialData] },
  })

  const totalResults = data?.pages.at(-1)?.total_results || 0
  const results = data?.pages.map((results) => (results ? results.results : [])).flat()

  return (
    <ScrollArea className="px-3 pb-6">
      <ul className="space-y-2">
        {results.map((review, i) => (
          <Review key={i} review={review} />
        ))}

        {isFetching && [...Array(Math.min(3, totalResults - results.length))].map((_, i) => <ReviewSkeleton key={i} />)}
      </ul>

      {hasNextPage && !isFetching && (
        <InView onChange={(inView) => inView && !isFetching && fetchNextPage()} className="flex justify-center">
          <Spinner />
        </InView>
      )}
    </ScrollArea>
  )
}

export function Review({ review }: { review: TReview }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <li className="accent-muted rounded-md p-2" onClick={() => setExpanded(!expanded)}>
      <div className="mb-3 flex items-center gap-2 text-sm">
        <TMDBImage type="profile" src={review.author_details.avatar_path} alt="" className="size-6 rounded-full" />
        <div>{review.author}</div>
        <div className="xs-muted">{timeAgo(review.created_at)}</div>
      </div>

      <p className={`sm-muted ${expanded ? 'line-clamp-none' : 'line-clamp-5'}`}>{review.content}</p>
    </li>
  )
}

export function ReviewSkeleton() {
  return (
    <li className="rounded-md border p-2">
      <div className="mb-3 flex items-center gap-2">
        <Skeleton className="size-6 rounded-full" />
        <Skeleton className="h-4 w-30" />
      </div>

      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="mb-1 h-4 w-full last-of-type:w-1/2" />
      ))}
    </li>
  )
}
