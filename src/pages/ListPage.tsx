import { useState } from 'react'
import { Link } from 'react-router'
import type { Character } from '../types/character'

interface Props {
  characters: Character[]
}

export default function ListPage({ characters }: Props) {
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [direction, setDirection] = useState('asc')

  const visible = characters
    .filter(character =>
      character.name.toLowerCase().includes(query.trim().toLowerCase()),
    )
    .sort((a, b) => {
      const comparison =
        sortBy === 'name'
          ? a.name.localeCompare(b.name)
          : a.rarity - b.rarity || a.name.localeCompare(b.name)

      return direction === 'asc' ? comparison : -comparison
    })

  return (
    <section>
      <h2>Character list</h2>

      <div className="controls">
        <label>
          Search
          <input
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search character names"
          />
        </label>

        <label>
          Sort by
          <select
            value={sortBy}
            onChange={event => setSortBy(event.target.value)}
          >
            <option value="name">Name</option>
            <option value="rarity">Rarity</option>
          </select>
        </label>

        <label>
          Order
          <select
            value={direction}
            onChange={event => setDirection(event.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      <p aria-live="polite">{visible.length} characters found</p>

      <ul className="character-list">
        {visible.map(character => (
          <li key={character.id}>
            <Link to={`/characters/${character.id}`}>
              <strong>{character.name}</strong>
              <span>
                {character.vision} · {character.weapon} ·
                {' '}{character.rarity} stars
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {visible.length === 0 && <p>No matching characters.</p>}
    </section>
  )
}