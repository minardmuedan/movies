import TMDBImage from '@/components/image'
import { TMDBFetch } from '@/lib/fetcher'
import { TPerson } from '@/types/tmdb'
import PersonKnownFor from './sections/known-for'
import PersonCredits from './sections/credits'

export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await TMDBFetch<TPerson>(`/person/${id}`)

  if (!result.isSuccess) return <p>error</p>

  const person = result.data

  return (
    <div className="space-y-28">
      <section>
        <div className="flex gap-10">
          <TMDBImage type="profile" src={person.profile_path} alt="" className="size-80" />
          <div className="flex-1">
            <h1>{person.name}</h1>
            <p className="sm-muted mb-20">{person.biography}</p>

            <div className="mb-2">
              <span className="text-muted-foreground">Known for department: </span>
              {person.known_for_department}
            </div>

            <div>
              <span className="text-muted-foreground">Place of birth: </span>
              {person.place_of_birth}
            </div>
          </div>
        </div>
      </section>

      <PersonKnownFor id={id} />

      <PersonCredits id={id} />
    </div>
  )
}
