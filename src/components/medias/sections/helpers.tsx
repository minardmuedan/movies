'use client'

import Link from 'next/link'
import { createContext, useContext, useState } from 'react'
import { InView } from 'react-intersection-observer'

type TSectionContext = { sections: string[]; activeSection: string; setActiveSection: (section: string) => void }
const sectionContext = createContext<TSectionContext | null>(null)

const useMediaSectionContext = () => {
  const context = useContext(sectionContext)
  if (!context) throw 'Context must be wrapped inside its provider'
  return context
}

const MediaSectionProvider = ({ sections, children }: { sections: string[]; children: React.ReactNode }) => {
  const [activeSection, setActiveSection] = useState(sections[0])
  return <sectionContext.Provider value={{ sections, activeSection, setActiveSection }}>{children}</sectionContext.Provider>
}

type Props = { section: string; children: React.ReactNode; as?: 'section' | 'div'; className?: string }

const MediaSection = ({ section, children, as = 'section', className }: Props) => {
  const { setActiveSection } = useMediaSectionContext()

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

const MediaSectionSideNav = () => {
  const { sections, activeSection } = useMediaSectionContext()
  const activeIndex = sections.indexOf(activeSection)

  return (
    <aside className="sticky top-25 hidden h-fit w-full max-w-52 lg:block">
      <h2 className="text-muted-foreground text-lg">On this page</h2>

      <nav className="mt-6">
        <ul className="relative space-y-4">
          <div
            style={{ transform: `translateY(${(activeIndex > sections.indexOf('Reviews_Keywords') ? activeIndex + 1 : activeIndex) * (16 + 36)}px)` }}
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

const Navlink = ({ section, render }: { section: string; render?: string }) => {
  const { activeSection } = useMediaSectionContext()
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

export { MediaSection, MediaSectionProvider, MediaSectionSideNav }
