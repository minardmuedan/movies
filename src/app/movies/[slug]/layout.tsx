import { TMDBMovies } from '@/lib/fetcher'
import { Suspense } from 'react'

type Params = Promise<{ slug: string }>

export const generateStaticParams = () => Object.keys(TMDBMovies).map((keys) => ({ slug: keys }))

export default function MoviesLayout({ params, children }: { params: Params; children: React.ReactNode }) {
  return (
    <section>
      <Suspense>
        <Header params={params} />
      </Suspense>

      {children}
    </section>
  )
}

async function Header({ params }: { params: Params }) {
  const { slug } = await params
  const title = TMDBMovies[slug as keyof typeof TMDBMovies].title

  return (
    <header className="my-12 flex flex-col max-lg:text-center">
      <h1 className="mb-2 text-3xl font-semibold">{title}</h1>
      <p className="sm-muted mb-6">Discover something new to watch.</p>
    </header>
  )
}
