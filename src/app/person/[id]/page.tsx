import TMDBImage from '@/components/image'
import { TMDBFetch } from '@/lib/fetcher'
import { TPerson } from '@/types/tmdb'
import PersonKnownFor from './sections/known-for'
import PersonCredits from './sections/credits'
import SeeMoreParagraph from '@/components/see-more'

export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await TMDBFetch<TPerson>(`/person/${id}`)

  if (!result.isSuccess) return <p>error</p>

  const person = result.data

  return (
    <div className="[&_h2]:text-muted-foreground space-y-28 [&_h2]:text-xl [&_h2:not([class*='mb-'])]:mb-6">
      <section className="mt-4">
        <div className="flex gap-10">
          <TMDBImage type="profile" src={person.profile_path} alt="" className="aspect-2/3 h-fit w-72 shrink-0 rounded-md" />

          <div className="[&_span]:text-muted-foreground flex-1 text-sm">
            <h1 className="mb-2 text-2xl font-semibold">{person.name}</h1>
            <SeeMoreParagraph text={person.biography} className="sm-muted mb-20 max-w-175" />

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

          <div className="ml-6 text-sm">
            <div className="mb-3">also known as</div>

            <ul className="sm-muted list-disc">
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
