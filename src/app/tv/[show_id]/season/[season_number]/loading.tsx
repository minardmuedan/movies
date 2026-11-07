import { Skeleton } from '@/components/ui/skeleton'

export default function SeasonDetailsLoading() {
  return (
    <div className="w-full flex-1 py-1">
      <section className="mb-20 *:mx-auto">
        <Skeleton className="mb-6 aspect-2/3 w-52 rounded-md" />
        <Skeleton className="mb-1 h-3 w-24" />
        <Skeleton className="mb-2 h-8 w-40" />

        {['w-full', 'w-1/2'].map((cn, i) => (
          <Skeleton key={i} className={`mb-1 h-3 max-w-175 ${cn}`} />
        ))}
      </section>

      <section>
        <h3 className="heading-title">Episodes</h3>

        <ul className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <li key={i} className="flex h-24 w-full rounded-sm border py-2 md:h-28">
              <div className="my-auto w-10 text-center">{i + 1}</div>

              <Skeleton className="aspect-video h-full rounded" />

              <div className="*: space-y-1- ml-2 flex-1">
                <Skeleton className="mb-1 h-3 w-24" />

                {['w-full', 'w-3/4'].map((cn, i) => (
                  <Skeleton key={i} className={`mb-1 h-3 max-w-175 ${cn}`} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
