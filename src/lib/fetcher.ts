import { notFound, unstable_rethrow } from 'next/navigation'

type FetchReturn<T> = { isSuccess: true; data: T } | { isSuccess: false; status: number; message: string }

export const TMDBFetch = async <T>(route: string): Promise<FetchReturn<T>> => {
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
