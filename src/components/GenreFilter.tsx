import { GENRES } from '../api/genres'
import './GenreFilter.css'

type GenreFilterProps = {
  value: number | null
  onChange: (genreId: number | null) => void
}

const options = [{ id: null, name: 'All' }, ...GENRES]

function GenreFilter({ value, onChange }: GenreFilterProps) {
  return (
    <div className="genre-filter" role="group" aria-label="Filter by genre">
      {options.map(({ id, name }) => {
        const isActive = value === id
        return (
          <button
            key={id ?? 'all'}
            type="button"
            className={isActive ? 'genre-button active' : 'genre-button'}
            aria-pressed={isActive}
            onClick={() => onChange(id)}
          >
            {name}
          </button>
        )
      })}
    </div>
  )
}

export default GenreFilter
