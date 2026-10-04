import { MovieSection } from '@/components/movie-section'

export default function MovieMedia({ id }: { id: string }) {
  return (
    <MovieSection section="Media">
      <h3>Media</h3>

      <div className="flex w-full gap-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-accent aspect-square w-full"></div>
        ))}
      </div>
    </MovieSection>
  )
}
