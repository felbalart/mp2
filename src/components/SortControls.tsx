import type { SortDirection, SortField, SortOption } from '../utils/sortMovies'
import './SortControls.css'

type SortControlsProps = {
  value: SortOption | null
  onChange: (value: SortOption | null) => void
}

const fields: { field: SortField; label: string }[] = [
  { field: 'title', label: 'Title' },
  { field: 'vote_average', label: 'Vote Average' },
]

const directions: SortDirection[] = ['asc', 'desc']

function SortControls({ value, onChange }: SortControlsProps) {
  const handleClick = (option: SortOption, isActive: boolean) => {
    onChange(isActive ? null : option)
  }

  return (
    <div className="sort-controls" role="group" aria-label="Sort movies">
      <span className="sort-label">Sort by:</span>
      {fields.map(({ field, label }) => (
        <div key={field} className="sort-group">
          <span className="sort-field">{label}</span>
          {directions.map((direction) => {
            const isActive = value?.field === field && value.direction === direction
            return (
              <button
                key={direction}
                type="button"
                className={isActive ? 'sort-button active' : 'sort-button'}
                aria-pressed={isActive}
                onClick={() => handleClick({ field, direction }, isActive)}
              >
                {direction.toUpperCase()}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default SortControls
