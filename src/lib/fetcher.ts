type FetchReturn<T> = { isSuccess: true; data: T } | { isSuccess: false; message: string }

export const TMDBFetch = async <T>(route: string): Promise<FetchReturn<T>> => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3${route}`, { headers: { Authorization: `Bearer ${process.env.TMDB_KEY}` } })
    if (!res.ok) throw '' // todo: put proper error handling

    const data = await res.json()
    return { isSuccess: true, data }
  } catch (err) {
    return { isSuccess: false, message: 'Something went wrong getting the data!' }
  }
}
