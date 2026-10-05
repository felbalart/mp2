import './RatingStar.css'

type RatingStarProps = {
  value: number | null
}

function RatingStar({ value }: RatingStarProps) {
  const label = value ? value.toFixed(1) : '-'

  return (
    <span className="rating-star" title={value ? `Rating ${label} / 10` : 'No rating'}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 1.5l3.09 6.26 6.91 1-5 4.87 1.18 6.88L12 17.27l-6.18 3.24L7 13.63 2 8.76l6.91-1z" />
      </svg>
      <span className="rating-star-value">{label}</span>
    </span>
  )
}

export default RatingStar
