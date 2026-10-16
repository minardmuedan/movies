import { ButtonLink } from './ui/button'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-12 items-center justify-between border-b px-5">
      <ButtonLink href="/" variant="ghost">
        Home
      </ButtonLink>

      <nav>
        <ul className="flex items-center gap-2">
          <li>
            <ButtonLink variant="ghost" href="/tv-shows">
              Tv Shows
            </ButtonLink>
          </li>

          <li>
            <ButtonLink href="/movies">Movies</ButtonLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
