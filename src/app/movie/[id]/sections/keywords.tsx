import MediaKeywordsSection from '@/components/medias/sections/keywords'
import { TMDBFetch } from '@/lib/fetcher'
import { type TMovieKeywords } from '@/types/tmdb'

export default async function MovieKeywordsSection({ id }: { id: string }) {
  const result = await TMDBFetch<TMovieKeywords>(`/movie/${id}/keywords`)

  if (!result.isSuccess) return <p>error</p>

  return <MediaKeywordsSection keywords={result.data.keywords} />
}
