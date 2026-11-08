import TMDBImage from '@/components/image'
import { TMDBFetch } from '@/lib/fetcher'
import { TPersonDetails } from '@/schema & types/tmdb'
import ExpandableText from '@/components/expandable-text'
import { ErrorFallback } from '@/components/ui/empty-error'
import { Skeleton } from '@/components/ui/skeleton'
import { Suspense } from 'react'

export default function PersonHeroSection({ person_id }: { person_id: string }) {
  return (
    <section className="mt-4 flex flex-col flex-wrap gap-20 md:flex-row md:gap-10">
      <Suspense fallback={<LoadingFallback />}>
        <Data person_id={person_id} />
      </Suspense>
    </section>
  )
}

async function Data({ person_id }: { person_id: string }) {
  const result = await TMDBFetch<TPersonDetails>(`/person/${person_id}`, 'details')
  if (!result.isSuccess)
    return (
      <>
        <h1 className="sr-only">Person Hero Details</h1>
        <ErrorFallback message={result.message} className="h-[calc(100dvh-4.5rem)]" />
      </>
    )

  const person = result.data
  return (
    <>
      <TMDBImage
        loading="eager"
        type="profile"
        src={person.profile_path}
        alt={person.name}
        sizes="(min-width: 1040px) 288px, (min-width: 780px) 240px, 288px"
        className="mx-auto aspect-2/3 h-fit w-72 shrink-0 rounded-md md:w-60 lg:w-72"
      />

      <div className="[&_span]:text-muted-foreground min-w-72 flex-1 text-sm">
        <h1 className="mb-2 text-2xl font-semibold">{person.name}</h1>
        <ExpandableText text={person.biography} />

        <div className="mt-12 mb-2">
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
    </>
  )
}

function LoadingFallback() {
  return (
    <>
      <Skeleton className="mx-auto aspect-2/3 h-fit w-72 shrink-0 rounded-md md:w-60 lg:w-72" />

      <div className="max-w-175 flex-1">
        <Skeleton className="mb-2 h-7 w-60" />

        <div className="space-y-1">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className={`h-4 ${i === 3 ? 'w-1/2' : 'w-full'}`} />
          ))}
        </div>

        <div className="mt-12 space-y-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-40" />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3">also known as</div>
        <div className="space-y-1">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-40" />
          ))}
        </div>
      </div>
    </>
  )
}
