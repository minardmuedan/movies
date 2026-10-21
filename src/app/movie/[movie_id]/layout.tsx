import BackButton from '@/components/back'
import { MediaSectionProvider, MediaSectionSideNav } from '@/components/medias/sections/helpers'

export default function MovieDetailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackButton className="md:sticky md:top-14" />

      <div className="mt-60 flex gap-6">
        <MediaSectionProvider sections={['Details', 'Credits', 'Media', 'Reviews_Keywords', 'Similar', 'Recommendations']}>
          <MediaSectionSideNav />

          {children}
        </MediaSectionProvider>
      </div>
    </>
  )
}
