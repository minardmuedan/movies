import BackButton from '@/components/back'

export default function MovieDetailsLayout({ children }: { children: React.ReactNode }) {
  const sections = ['Details', 'Cast', 'Reviews ', 'Keywords', 'Media', 'Similar', 'Recommendation']

  return (
    <>
      <BackButton />

      <div className="mt-60 flex">
        <aside className="w-full max-w-40 border">
          <h2 className="text-muted-foreground text-lg">On this page</h2>

          <nav className="mt-6">
            <ul className="space-y-4">
              {sections.map((section, i) => (
                <li key={i}>{section}</li>
              ))}
            </ul>
          </nav>
        </aside>

        {children}
      </div>
    </>
  )
}
