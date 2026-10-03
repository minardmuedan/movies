import TMDBImage from '@/components/image'
import { TMDBFetch } from '@/lib/fetcher'
import { TPerson } from '@/types/tmdb'
import PersonKnownFor from './sections/known-for'

export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const person = await TMDBFetch<TPerson>(`https://api.themoviedb.org/3/person/${id}`)
  return (
    <div className="space-y-28">
      <section>
        <div className="flex gap-10">
          <TMDBImage type="profile" src={person.profile_path} alt="" className="size-80" />
          <div className="flex-1">
            <h1>{person.name}</h1>
            <p className="sm-muted">{person.biography}</p>
          </div>
        </div>
      </section>

      <PersonKnownFor id={id} />
    </div>
  )
}
