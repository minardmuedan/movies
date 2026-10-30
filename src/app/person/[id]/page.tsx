import TMDBImage from '@/components/image'
import { TMDBFetch } from '@/lib/fetcher'
import { TPersonDetails } from '@/schema & types/tmdb'
import PersonKnownFor from './sections/known-for'
import PersonCredits from './sections/credits'
import ExpandableText from '@/components/expandable-text'

export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await TMDBFetch<TPersonDetails>(`/person/${id}`)

  if (!result.isSuccess) return <p>error</p>

  const person = result.data

  return (
    <div className="[&_h2]:heading-title space-y-28">
      <section className="mt-4">
        <div className="flex flex-col flex-wrap gap-20 md:flex-row md:gap-10">
          <TMDBImage type="profile" src={person.profile_path} alt="" className="mx-auto aspect-2/3 h-fit w-72 shrink-0 rounded-md md:w-60 lg:w-72" />

          <div className="[&_span]:text-muted-foreground min-w-72 flex-1 text-sm">
            <h1 className="mb-2 text-2xl font-semibold">{person.name}</h1>
            <ExpandableText text={person.biography} />

            <div className="mb-2">
              <span>Age: </span>
              {Math.floor((Date.now() - new Date(person.birthday).getTime()) / 31557600000)}
            </div>

            <div className="mb-2">
              <span>Known for department: </span>
              {person.known_for_department}
            </div>

            <div>
              <span>Place of birth: </span>
              {person.place_of_birth}
            </div>
          </div>

          <div>
            <div className="mb-3">also known as</div>

            <ul className="sm-muted ml-6 list-disc">
              {person.also_known_as.map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <PersonKnownFor id={id} />

      <PersonCredits id={id} />
    </div>
  )
}
