import { useState } from 'react'
import { Link } from 'react-router'
import { characterImage } from '../api/genshin'
import type { Character } from '../types/character'

interface Props {
  characters: Character[]
}

export default function GalleryPage({ characters }: Props) {
  const [element, setElement] = useState('')

  const elements = [...new Set(characters.map(character => character.vision))]
    .sort()

  const visible = characters.filter(
    character => element === '' || character.vision === element,
  )

  return (
    <section>
      <h2>Character gallery</h2>

      <label>
        Element
        <select
          value={element}
          onChange={event => setElement(event.target.value)}
        >
          <option value="">All elements</option>
          {elements.map(value => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </label>

      <p aria-live="polite">{visible.length} characters</p>

      <div className="gallery">
        {visible.map(character => (
          <Link
            className="card"
            key={character.id}
            to={`/characters/${character.id}`}
          >
            <img
              src={characterImage(character.id)}
              alt={character.name}
              loading="lazy"
            />
            <h3>{character.name}</h3>
            <p>{character.vision} · {character.rarity} stars</p>
          </Link>
        ))}
      </div>

      {visible.length === 0 && <p>No characters match this filter.</p>}
    </section>
  )
}