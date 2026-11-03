import PersonCreditsSection from './sections/credits'
import PersonHeroDetailsSection from './sections/hero'
import PersonKnownForSection from './sections/known-for'

export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="[&_h2]:heading-title space-y-28">
      <PersonHeroDetailsSection id={id} />
      <PersonKnownForSection id={id} />
      <PersonCreditsSection id={id} />
    </div>
  )
}
