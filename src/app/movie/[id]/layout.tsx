import BackButton from '@/components/back'
import { MovieSectionContextProvider, MovieSectionSideNav } from '@/components/movie-section'

export default function MovieDetailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackButton />

      <div className="mt-60 flex gap-6">
        <MovieSectionContextProvider>
          <MovieSectionSideNav />

          {children}
        </MovieSectionContextProvider>
      </div>
    </>
  )
}
