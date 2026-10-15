import { TMDBFetch } from '@/lib/fetcher'

export default async function PersonCredits({ id }: { id: string }) {
  const data = await TMDBFetch(`/person/${id}/combined_credits`)

  if (!data.isSuccess) return <p>error</p>

  return <div>{JSON.stringify(data.data)}</div>
}
