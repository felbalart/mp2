import { useState } from 'react'
import SearchForm from '../components/SearchForm'
import { useFirstMatch } from '../hooks/useFirstMatch'
import './ListView.css'

function ListView() {
  const [query, setQuery] = useState('')
  const firstMatch = useFirstMatch(query)

  return (
    <section>
      <h1>List</h1>
      <SearchForm onChange={setQuery} />
      <p className="first-match">
        First match:{' '}
        <span id="first_match">{firstMatch.status === 'found' ? firstMatch.title : ''}</span>
        {firstMatch.status === 'loading' && <em>Searching…</em>}
        {firstMatch.status === 'not-found' && <em>No match</em>}
        {firstMatch.status === 'error' && <em className="error">{firstMatch.message}</em>}
      </p>
    </section>
  )
}

export default ListView
