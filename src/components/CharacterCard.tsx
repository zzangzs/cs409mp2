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
      <p>{character.vision} · {character.rarity} stars</p>
    </Link>
  )
}