import BackButton from '@/components/back'
import { MediaSectionProvider, MediaSectionSideNav } from '@/components/medias/sections/helpers'

export default function MovieDetailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackButton className="bg-background/50 md:sticky md:top-14" />

      <div className="mt-60 flex gap-6">
        <MediaSectionProvider sections={['Details', 'Credits', 'Reviews_Keywords', 'Media', 'Similar', 'Recommendations']}>
          <MediaSectionSideNav />

          {children}
        </MediaSectionProvider>
      </div>
    </>
  )
}
