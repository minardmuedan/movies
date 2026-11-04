import { EmptyFallback } from '@/components/ui/empty-error'
import { Skeleton } from '@/components/ui/skeleton'

export default function Homepage() {
  return (
    <div className="[&_span]:text-muted-foreground space-y-6">
      <div className="flex w-fit items-center gap-3 text-2xl">
        <div>2xl text</div>
        <Skeleton className="h-7 w-40" />
        <span>h-7</span>
      </div>

      <div className="flex w-fit items-center gap-3 text-xl">
        <div>base text</div>
        <Skeleton className="h-6 w-36" />
        <span>h-6</span>
      </div>

      <div className="flex w-fit items-center gap-3">
        <div>base text</div>
        <Skeleton className="h-5 w-32" />
        <span>h-5</span>
      </div>

      <div className="flex w-fit items-center gap-3 text-sm">
        <div>sm text</div>
        <Skeleton className="h-4 w-28" />
        <span>h-4</span>
      </div>

      <div className="flex w-fit items-center gap-3 text-xs">
        <div>xs text</div>
        <Skeleton className="h-3 w-20" />
        <span>h-3</span>
      </div>
    </div>
  )
}
