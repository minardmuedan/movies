import SearchDialog from './search-dialog'
import { ButtonLink } from './ui/button'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-12 items-center justify-between border-b px-5">
      <ButtonLink href="/" variant="ghost">
        Home
      </ButtonLink>

      <nav className="flex items-center gap-2">
        <ButtonLink variant="ghost" href="/tv-shows">
          Tv Shows
        </ButtonLink>

        <ButtonLink href="/movies">Movies</ButtonLink>

        <SearchDialog />
      </nav>
    </header>
  )
}
