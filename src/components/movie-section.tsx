'use client'

import Link from 'next/link'
import { createContext, useContext, useState } from 'react'
import { InView } from 'react-intersection-observer'

const sections = ['Details', 'Credits', 'Reviews_Keywords', 'Media', 'Similar', 'Recommendations'] as const

type Sections = (typeof sections)[number]
type TSectionContext = { activeSection: Sections; setActiveSection: (section: Sections) => void }

const sectionContext = createContext<TSectionContext | null>(null)

const useMovieSectionContext = () => {
  const context = useContext(sectionContext)
  if (!context) throw 'context must be wrapped by the Provider'
  return context
}

const MovieSectionContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeSection, setActiveSection] = useState<Sections>('Details')
  return <sectionContext.Provider value={{ activeSection, setActiveSection }}>{children}</sectionContext.Provider>
}

type MovieSectionProps = { section: Sections; children: React.ReactNode; as?: 'section' | 'div'; className?: string }

const MovieSection = ({ section, children, as = 'section', className }: MovieSectionProps) => {
  const { setActiveSection } = useMovieSectionContext()
  return (
    <InView
      id={section.toLocaleLowerCase()}
      as={as}
      className={className}
      onChange={(inView) => inView && setActiveSection(section)}
      rootMargin="-40% 0% -50% 0%"
    >
      {children}
    </InView>
  )
}

const MovieSectionSideNav = () => {
  const { activeSection } = useMovieSectionContext()
  const activeIndex = sections.indexOf(activeSection)

  return (
    <aside className="sticky top-14 h-fit w-full max-w-52">
      <h2 className="text-muted-foreground text-lg">On this page</h2>

      <nav className="mt-6">
        <ul className="relative space-y-4">
          <div
            style={{ transform: `translateY(${(activeIndex > 2 ? activeIndex + 1 : activeIndex) * (16 + 36)}px)` }}
            className={`from-primary to-primary/0 absolute top-0 left-0 -z-1 h-9 w-full rounded-l-md bg-linear-to-r transition-all duration-400 ${activeSection === 'Reviews_Keywords' ? 'h-22' : 'h-9'}`}
          >
            <span className="sr-only">active section indicator</span>
          </div>

          {sections.map((section) =>
            section === 'Reviews_Keywords' ? (
              ['Reviews', 'Keywords'].map((v) => <Navlink key={v} section={section} render={v} />)
            ) : (
              <Navlink key={section} section={section} />
            ),
          )}
        </ul>
      </nav>
    </aside>
  )
}

const Navlink = ({ section, render }: { section: Sections; render?: string }) => {
  const { activeSection } = useMovieSectionContext()
  return (
    <li>
      <Link href={`#${section.toLocaleLowerCase()}`}>
        <div
          className={`hover:text-foreground rounded px-3 py-2 text-sm transition-colors ${activeSection === section ? 'text-foreground delay-350' : 'text-muted-foreground'}`}
        >
          {render || section}
        </div>
      </Link>
    </li>
  )
}

export { MovieSection, MovieSectionContextProvider, MovieSectionSideNav }
