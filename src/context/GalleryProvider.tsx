import { useMemo, useState, type ReactNode } from 'react'
import { useTopRatedMovies } from '../hooks/useTopRatedMovies'
import { GalleryContext } from './galleryContext'

type GalleryProviderProps = {
  children: ReactNode
}

function GalleryProvider({ children }: GalleryProviderProps) {
  const [genreId, setGenreId] = useState<number | null>(null)
  const state = useTopRatedMovies(genreId)

  const value = useMemo(
    () => ({
      genreId,
      setGenreId,
      state,
      movies: state.status === 'success' ? state.movies : [],
    }),
    [genreId, state],
  )

  return <GalleryContext value={value}>{children}</GalleryContext>
}

export default GalleryProvider
