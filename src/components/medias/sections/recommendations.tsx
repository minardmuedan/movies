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
            <MediaCard data={data} />
          </li>
        ))}
      </ul>
    </MediaSection>
  )
}
