import Image from 'next/image'
import SearchDialog from './search-dialog'
import { ButtonLink } from './ui/button'
import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-12 items-center justify-between border-b px-5">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={32} height={32} />
        <span className="sr-only">go to home</span>
      </Link>

      <nav className="flex items-center gap-2">
        <ButtonLink variant="ghost" href="/tv-shows">
          Tv Shows
        </ButtonLink>

        <ButtonLink href="/movies">Movies</ButtonLink>

        <SearchDialog className="w-fit *:data-[slot=placeholder]:max-md:sr-only md:w-52" />
      </nav>
    </header>
  )
}
