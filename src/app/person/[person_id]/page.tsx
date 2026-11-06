import PersonCreditsSection from './sections/credits'
import PersonHeroDetailsSection from './sections/hero'
import PersonKnownForSection from './sections/known-for'

export default async function PersonPage({ params }: { params: Promise<{ person_id: string }> }) {
  const { person_id } = await params

  return (
    <div className="[&_h2]:heading-title space-y-28">
      <PersonHeroDetailsSection person_id={person_id} />
      <PersonKnownForSection person_id={person_id} />
      <PersonCreditsSection person_id={person_id} />
    </div>
  )
}
