import 'server-only'
import { searchSchema, type TSearchSchema } from '@/schema & types/params'
import type { TMovies, TTvShows } from '@/schema & types/tmdb'
import { notFound, unstable_rethrow } from 'next/navigation'
import { cacheLife } from 'next/cache'

const BASE_URL = 'https://api.themoviedb.org/3'

const CACHE_PROFILES = {
  lists: { stale: 300, revalidate: 3600, expire: 86400 },
  details: { stale: 3600, revalidate: 86400, expire: 604800 },
  weeks: { stale: 86400, revalidate: 604800, expire: 2592000 },
} as const

type CacheProfile = keyof typeof CACHE_PROFILES

type FetchReturn<T> = { isSuccess: true; data: T } | { isSuccess: false; status: number; message: string }

async function cachedFetch<T>(route: string, profile: CacheProfile): Promise<T> {
  'use cache'
  cacheLife(CACHE_PROFILES[profile])

  const res = await fetch(`${BASE_URL}${route}`, {
    headers: { Authorization: `Bearer ${process.env.TMDB_KEY}` },
  })

  if (!res.ok) throw new Error(String(res.status))
  return res.json()
}

export async function TMDBFetch<T>(route: string, profile: CacheProfile): Promise<FetchReturn<T>> {
  try {
    const data = await cachedFetch<T>(route, profile)
    return { isSuccess: true, data }
  } catch (err) {
    unstable_rethrow(err)
    if (err instanceof Error && err.message === '404') notFound()

    console.log('ERROR!:', err)
    return {
      isSuccess: false,
      status: 500,
      message: err instanceof Error ? err.message : 'Something went wrong getting the data!',
    }
  }
}

export async function TMDBDiscoverFetch(type: 'movie' | 'tv', params: Partial<Record<keyof TSearchSchema, unknown>>) {
  const searchParams = new URLSearchParams()

  Object.entries(searchSchema.parse(params)).map(([key, value]) => {
    if (Array.isArray(value)) return searchParams.set(key, value.join(','))
    if (value !== undefined) searchParams.set(key, String(value))
  })

  const route = `/discover/${type}?${searchParams}`

  console.log({ route })
  return await TMDBFetch<TMovies | TTvShows>(route, 'lists')
}
