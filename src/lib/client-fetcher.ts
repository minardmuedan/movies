export async function clientFetch<T>(url: string): Promise<T | null> {
  const res = await fetch(url)
  if ([400, 401, 403, 404, 409].includes(res.status)) return null
  return await res.json()
}
