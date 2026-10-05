import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import type { Movie } from '../api/tmdb'
import './MovieNav.css'

type MovieNavProps = {
  movies: Movie[]
  currentId: number
  source: string
}

function MovieNav({ movies, currentId, source }: MovieNavProps) {
  const navigate = useNavigate()
  const index = movies.findIndex((movie) => movie.id === currentId)
  const prev = index > 0 ? movies[index - 1] : null
  const next = index >= 0 && index < movies.length - 1 ? movies[index + 1] : null

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('input, textarea, select, [contenteditable="true"]')) return
      if (e.key === 'ArrowLeft' && prev) navigate(`/detail/${prev.id}`, { state: { source } })
      if (e.key === 'ArrowRight' && next) navigate(`/detail/${next.id}`, { state: { source } })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prev, next, navigate, source])

  if (index === -1) return null

  return (
    <nav className="movie-nav" aria-label="Movie navigation">
      {prev ? (
        <Link className="movie-nav-arrow" to={`/detail/${prev.id}`} state={{ source }} title={prev.title} aria-label={`Previous: ${prev.title}`}>
          ‹
        </Link>
      ) : (
        <span className="movie-nav-arrow disabled" aria-hidden="true">
          ‹
        </span>
      )}

      <span className="movie-nav-position">
        {index + 1} / {movies.length}
      </span>

      {next ? (
        <Link className="movie-nav-arrow" to={`/detail/${next.id}`} state={{ source }} title={next.title} aria-label={`Next: ${next.title}`}>
          ›
        </Link>
      ) : (
        <span className="movie-nav-arrow disabled" aria-hidden="true">
          ›
        </span>
      )}
    </nav>
  )
}

export default MovieNav
