import BackButton from '@/components/back'
import { MediaSectionProvider, MediaSectionSideNav } from '@/details-sections/helpers'

export default function TvDetailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackButton className="bg-background/50 md:sticky md:top-14" />

      <div className="mt-60 flex gap-6">
        <MediaSectionProvider sections={['Details', 'Seasons', 'Credits', 'Media', 'Reviews_Keywords', 'Similar', 'Recommendations']}>
          <MediaSectionSideNav />

          {children}
        </MediaSectionProvider>
      </div>
    </>
  )
}
