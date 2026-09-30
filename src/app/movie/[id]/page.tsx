import BackButton from '@/components/back'
import { TMovieDetails } from '@/types/tmdb'
import { TMDBFetch } from '@/utils/fetcher'

export default async function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const movie = await TMDBFetch<TMovieDetails>(`https://api.themoviedb.org/3/movie/${id}`)
  return (
    <div>
      <BackButton />
      <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt='' />
      <h1 className='text-3xl font-extrabold'>{movie.title}</h1>
      <h2>{movie.tagline}</h2>
      <p>{movie.poster_path}</p>
      <iframe
        src={`https://vidsrc.to/embed/movie/${movie.id}`}
        height='500px'
        width='100%'
        title='External Content'
        loading='lazy' // Optimizes initial page performance
        style={{ border: 0 }}
      />
      <iframe
        src={`https://vidfast.vc/movie/${movie.id}`}
        width='100%'
        height='500px'
        title='External Content'
        loading='lazy' // Optimizes initial page performance
        style={{ border: 0 }}
      />
    </div>
  )
}
