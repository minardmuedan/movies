import { StarIcon } from 'lucide-react'

function MovieRating({ average }: { average: number }) {
  return (
    <div className="flex items-center gap-1 text-xs text-yellow-600">
      <StarIcon className="size-4" /> {average.toFixed(1)}
    </div>
  )
}

export { MovieRating }
