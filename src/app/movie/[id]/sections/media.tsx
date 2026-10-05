import TMDBImage, { YoutubeImage } from '@/components/image'
import { MovieSection } from '@/components/movie-section'
import { TMDBFetch } from '@/lib/fetcher'
import { TMovieImages, type TMovieVideos } from '@/types/tmdb'

export default async function MovieMedia({ id }: { id: string }) {
  const [imagesResult, videosResult] = await Promise.all([
    TMDBFetch<TMovieImages>(`/movie/${id}/images`),
    TMDBFetch<TMovieVideos>(`/movie/${id}/videos`),
  ])

  if (!imagesResult.isSuccess || !videosResult.isSuccess) return <p>error</p>

  const images = imagesResult.data
  const videos = videosResult.data.results

  const medias = [
    { title: 'posters', data: images.posters, displayCount: 4 },
    { title: 'backdrops', data: images.backdrops, displayCount: 3 },
    { title: 'videos', data: videos, displayCount: 3 },
  ] as const

  return (
    <MovieSection section="Media">
      <h3>Media</h3>

      <div className="grid grid-cols-3 gap-10">
        {medias.map(({ title, data, displayCount }, i) => (
          <div key={i}>
            <h4 className="sm-muted mb-2 first-letter:uppercase">{title}</h4>

            <ul className="flex aspect-square flex-wrap gap-2">
              {[...Array(Math.min(data.length, displayCount))].map((_, i) => (
                <li key={i} className="relative grow basis-[calc(50%-0.25rem)] overflow-hidden *:size-full *:rounded">
                  {title === 'videos' ? <YoutubeImage src={videos[i].key} /> : <TMDBImage type="poster" src={images[title][i].file_path} alt="" />}

                  {data.length > displayCount && i === displayCount - 1 && (
                    <div className="bg-background/50 absolute inset-0 grid place-items-center text-sm font-medium">
                      {data.length - displayCount} +
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </MovieSection>
  )
}
