'use client'

import { createContext, useContext, useState } from 'react'
import { InView } from 'react-intersection-observer'

type Sections = ['Details', 'Credits', 'Reviews_Keywords', 'Media', 'Similar', 'Recommendations']
type TSectionContext = { activeSection: Sections[number]; setActiveSection: (section: Sections[number]) => void }

const sectionContext = createContext<TSectionContext | null>(null)

const useMovieSectionContext = () => {
  const context = useContext(sectionContext)
  if (!context) throw 'context must be wrapped by the Provider'
  return context
}

const MovieSectionContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeSection, setActiveSection] = useState<Sections[number]>('Details')
  return <sectionContext.Provider value={{ activeSection, setActiveSection }}>{children}</sectionContext.Provider>
}

type MovieSectionProps = { section: Sections[number]; children: React.ReactNode; as?: 'section' | 'div'; className?: string }

const MovieSection = ({ section, children, as = 'section', className }: MovieSectionProps) => {
  const { setActiveSection } = useMovieSectionContext()
  return (
    <InView
      as={as}
      className={className}
      onChange={(inView) => {
        if (inView) setActiveSection(section)
      }}
      rootMargin="-40% 0% -50% 0%"
    >
      {children}
    </InView>
  )
}

const MovieSectionSideNav = () => {
  const sections = ['Details', 'Credits', 'Reviews ', 'Keywords', 'Media', 'Similar', 'Recommendations']
  const { activeSection } = useMovieSectionContext()

  const translateY = activeSection === 'Reviews_Keywords' ? (16 + 36) * 2 : sections.indexOf(activeSection) * (16 + 36)

  return (
    <aside className="sticky top-14 h-fit w-full max-w-52">
      <h2 className="text-muted-foreground text-lg">On this page</h2>

      <nav className="mt-6">
        <ul className="sm-muted relative space-y-4">
          <div
            style={{ transform: `translateY(${translateY}px)` }}
            className={`from-primary to-primary/0 absolute top-0 left-0 -z-1 h-9 w-full rounded-l-md bg-linear-to-r transition-all duration-400 ${activeSection === 'Reviews_Keywords' ? 'h-22' : 'h-9'}`}
          >
            <span className="sr-only">active section indicator</span>
          </div>

          {sections.map((section, i) => (
            <li key={i} className={`rounded px-3 py-2 ${activeSection === section ? 'text-foreground' : ''}`}>
              {section}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export { MovieSectionContextProvider, MovieSection, MovieSectionSideNav }
