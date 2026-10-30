import PersonCreditsClient from '@/components/person-credits'
import { TMDBFetch } from '@/lib/fetcher'
import type { TPersonCombinedCredits } from '@/schema & types/tmdb'

export default async function PersonCredits({ id }: { id: string }) {
  const result = await TMDBFetch<TPersonCombinedCredits>(`/person/${id}/combined_credits`)

  if (!result.isSuccess) return <p>error</p>

  const media: Record<string, any> = { All: [...result.data.cast, ...result.data.crew], Acting: result.data.cast }
  result.data.crew.map(({ department, ...data }) => (media[department] = media[department] ? [...media[department], data] : [data]))

  return <PersonCreditsClient media={media} />
}
