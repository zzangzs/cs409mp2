import { Link } from 'react-router'
import { characterImage } from '../api/genshin'
import type { Character } from '../types/character'

interface Props {
  character: Character
}

export default function CharacterCard({ character }: Props) {
  return (
    <Link
      className="card"
      to={`/characters/${character.id}`}
    >
      <img
        src={characterImage(character.id)}
        alt={character.name}
        loading="lazy"
      />
      <h3>{character.name}</h3>
      <div className="card-metadata">
        <span className="card-element">{character.vision}</span>
        <span className={`rarity-badge rarity-${character.rarity}`}>
          <span aria-hidden="true">★</span> {character.rarity} stars
        </span>
      </div>
    </Link>
  )
}
