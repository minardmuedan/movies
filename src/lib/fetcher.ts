import { searchSchema, type TSearchSchema } from '@/schema & types/params'
import type { TMovies, TTvShows } from '@/schema & types/tmdb'
import { notFound, unstable_rethrow } from 'next/navigation'

type FetchReturn<T> = { isSuccess: true; data: T } | { isSuccess: false; status: number; message: string }

export async function TMDBFetch<T>(route: string): Promise<FetchReturn<T>> {
  try {
    const res = await fetch(`https://api.themoviedb.org/3${route}`, {
      headers: { Authorization: `Bearer ${process.env.TMDB_KEY}` },
    })

    if (!res.ok) {
      if (res.status === 404) notFound()

      throw '' // todo: put proper error handling
    }

    const data = await res.json()
    return { isSuccess: true, data }
  } catch (err) {
    unstable_rethrow(err)
    return { isSuccess: false, status: 500, message: 'Something went wrong getting the data!' }
  }
}

export async function TMDBDiscoverFetch(type: string, params: Partial<Record<keyof TSearchSchema, unknown>>) {
  const searchParams = new URLSearchParams()

  Object.entries(searchSchema.parse(params)).map(([key, value]) => {
    if (Array.isArray(value)) return searchParams.set(key, value.join(','))
    if (value !== undefined) searchParams.set(key, String(value))
  })

  const route = `/discover/${type}?${searchParams}`
  console.log({ fetch: route })
  return await TMDBFetch<TMovies | TTvShows>(route)
}
