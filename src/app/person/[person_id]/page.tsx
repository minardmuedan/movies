import { Suspense } from 'react'
import PersonCreditsSection from './sections/credits'
import PersonHeroDetailsSection from './sections/hero'
import PersonKnownForSection from './sections/known-for'

type Params = { params: Promise<{ person_id: string }> }

export default function PersonPage({ params }: { params: Promise<{ person_id: string }> }) {
  return (
    <Suspense fallback={null}>
      <Data params={params} />
    </Suspense>
  )
}

async function Data({ params }: Params) {
  const { person_id } = await params

  return (
    <div className="[&_h2]:heading-title space-y-28">
      <PersonHeroDetailsSection person_id={person_id} />
      <PersonKnownForSection person_id={person_id} />
      <PersonCreditsSection person_id={person_id} />
    </div>
  )
}
