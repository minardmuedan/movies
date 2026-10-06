import BackButton from '@/components/back'
import { MovieSectionContextProvider, MovieSectionSideNav } from '@/components/movie-section'

export default function MovieDetailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackButton className="md:sticky md:top-14" />

      <div className="mt-60 flex gap-6">
        <MovieSectionContextProvider>
          <MovieSectionSideNav />

          {children}
        </MovieSectionContextProvider>
      </div>
    </>
  )
}
