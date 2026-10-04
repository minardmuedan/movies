import BackButton from '@/components/back'
import { MovieSectionContextProvider, MovieSectionSideNav } from '@/components/movie-section'

export default function MovieDetailsLayout({ children }: { children: React.ReactNode }) {
  const sections = ['Details', 'Credits', 'Reviews ', 'Keywords', 'Media', 'Similar', 'Recommendations']

  return (
    <>
      <BackButton />

      <div className="mt-60 flex">
        <MovieSectionContextProvider>
          <MovieSectionSideNav />

          {children}
        </MovieSectionContextProvider>
      </div>
    </>
  )
}
