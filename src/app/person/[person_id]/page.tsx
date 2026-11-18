import { TMDBFetch } from '@/lib/fetcher'
import PersonCreditsSection from './sections/credits'
import PersonHeroDetailsSection from './sections/hero'
import PersonKnownForSection from './sections/known-for'
import type { TPersonDetails } from '@/schema & types/tmdb'

export async function generateMetadata({ params }: PageProps<'/person/[person_id]'>) {
  const { person_id } = await params
  const result = await TMDBFetch<TPersonDetails>(`/person/${person_id}`, 'details')
  return { title: result.isSuccess ? result.data.name : 'Person Details', description: 'Person Details' }
}

export default function PersonPage({ params }: PageProps<'/person/[person_id]'>) {
  const promisedPersonId = params.then((p) => p.person_id)

  return (
    <div className="[&_h2]:heading-title space-y-28">
      <PersonHeroDetailsSection promisedPersonId={promisedPersonId} />
      <PersonKnownForSection promisedPersonId={promisedPersonId} />
      <PersonCreditsSection promisedPersonId={promisedPersonId} />
    </div>
  )
}
