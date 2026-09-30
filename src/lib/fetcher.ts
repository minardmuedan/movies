export const TMDBFetch = async <T>(url: string): Promise<T> => {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${process.env.TMDB_KEY}` } })
  if (!res.ok) throw new Error('Something went wrong!')
  return await res.json()
}
