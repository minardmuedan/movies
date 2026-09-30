import { ButtonLink } from './ui/button'

export default function Navbar() {
  return (
    <header className="flex h-12 items-center justify-between border-b px-5">
      <ButtonLink href="/" variant="ghost">
        Home
      </ButtonLink>

      <nav>
        <ul>
          <li>
            <ButtonLink href="/movies">Movies</ButtonLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
