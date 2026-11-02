import type { TMovie, TTv } from '@/schema & types/tmdb'
import MediaCard from '../media-card'
import { MediaSection } from './helpers'

export default function MediaRecommendationsSection({ datas }: { datas: (TMovie | TTv)[] }) {
  return (
    <MediaSection section="Recommendations">
      <h3>Recommended For You</h3>

      <ul className="media-card-container md:grid-cols-3 xl:grid-cols-4">
        {datas.map((data) => (
          <li key={data.id}>
            <MediaCard
              data={data}
              imageSizes="(min-width: 1680px) 307px, (min-width: 1280px) calc(21.05vw - 42px), (min-width: 1040px) calc(33.18vw - 112px), (min-width: 640px) calc(33.16vw - 32px), calc(50vw - 30px)"
            />
          </li>
        ))}
      </ul>
    </MediaSection>
  )
}
