import Link from 'next/link'
// import SearchBar from './search-bar'
import Image from 'next/image'
import { ButtonLink } from './ui/button'
import SearchDialog from './search-dialog'

export default function Footer() {
  const navlinks = [
    {
      title: 'Movies',
      links: [
        { title: 'Popular', href: '/movies' },
        { title: 'Now Playing', href: '/movies/now-playing' },
        { title: 'Top Rated', href: '/movies/top-rated' },
        { title: 'Upcoming', href: '/movies/upcoming' },
      ],
    },
    {
      title: 'Tv Shows',
      links: [
        { title: 'Airing Today', href: '/tv-shows/airing-today' },
        { title: 'On the Air', href: '/tv-shows/on-the-air' },
        { title: 'Popular', href: '/tv-shows' },
        { title: 'Top Rated', href: '/tv-shows/top-rated' },
      ],
    },
  ]

  const socialLinks = [
    {
      title: 'github',
      logoSrc: '/github.svg',
      href: 'https://github.com/minardmuedan',
    },
    {
      title: 'instagram',
      logoSrc: '/instagram.svg',
      href: 'https://www.instagram.com/parilla_minard/',
    },
    {
      title: 'facebook',
      logoSrc: '/facebook.svg',
      href: 'https://www.facebook.com/minard.parilla',
    },
  ]

  return (
    <footer className="mt-20">
      <div className="mx-auto mb-7 w-10/12 max-w-sm border-t">
        <span className="sr-only">footer line</span>
      </div>

      <div className="mb-7 flex flex-col items-center gap-2 px-2 md:px-4">
        <p className="text-muted-foreground font-medium">{'Didn’t find what you’re looking for?'}</p>
        <SearchDialog placeholder="Try to search it..." className="w-full max-w-175" />
      </div>

      <div className="relative px-2 pt-7 pb-5 md:px-4">
        <Image src="/hero-bg.png" alt="hero background" priority fill className="-z-10 object-cover opacity-5" />

        <ul className="mb-7 flex flex-col justify-between gap-10 border-b pb-7 md:flex-row">
          <li>
            <p className="text-primary mb-2 text-xl font-medium">Minard Movies</p>
            <p className="text-muted-foreground max-w-175 text-sm">
              Discover endless entertainment with our curated collection of movies and TV shows. Explore a world of captivating stories and
              unforgettable moments. Your next favorite film or series awaits!
            </p>
          </li>

          <li className="flex justify-center gap-10 text-center whitespace-nowrap md:text-start">
            {navlinks.map(({ title, links }, i) => (
              <div key={i}>
                <p className="mb-2">{title}</p>
                <nav>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    {links.map((link, i2) => (
                      <li key={i2}>
                        <Link href={link.href} className="hover:text-primary transition-colors">
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </li>

          <div className="flex flex-col items-center gap-5">
            <p className="text-muted-foreground text-center text-xs">the provider of movies and tv shows</p>
            <Link href="https://www.themoviedb.org/">
              <Image src="/tmdb-logo.svg" alt="tmdb logo" width={80} height={80} /> <span className="sr-only">go to tmdb website</span>
            </Link>
          </div>
        </ul>

        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          <p className="text-muted-foreground text-xs">© 2024 · Minard Parilla | All rights reserved</p>

          <ul className="flex items-center gap-5">
            {socialLinks.map(({ title, href, logoSrc }, i) => (
              <li key={i}>
                <Link href={href} target="_blank">
                  <>
                    <Image src={logoSrc} alt={`${title} logo`} width={16} height={16} className={`${i == 0 && 'invert'}`} />
                    <span className="sr-only">{title}</span>
                  </>
                </Link>
              </li>
            ))}
            <li>
              <ButtonLink variant="outline" href="https://minardparilla.vercel.app">
                {'minard’s portfolio'}
              </ButtonLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
