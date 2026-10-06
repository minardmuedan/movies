import { ButtonLink } from './ui/button'

export default function Navbar() {
  return (
    <header className="sticky flex h-12 items-center justify-between px-5">
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
