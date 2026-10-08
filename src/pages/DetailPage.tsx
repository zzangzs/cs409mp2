import { Link, useParams } from 'react-router'
import { characterImage } from '../api/genshin'
import type { Character } from '../types/character'

interface Props {
  characters: Character[]
}

export default function DetailPage({ characters }: Props) {
  const { id } = useParams()

  const ordered = [...characters].sort((a, b) =>
    a.name.localeCompare(b.name),
  )

  const index = ordered.findIndex(character => character.id === id)
  const character = ordered[index]

  if (!character) {
    return (
      <section>
        <h2>Character not found</h2>
        <Link to="/">Return to the list</Link>
      </section>
    )
  }

  const previous =
    ordered[(index - 1 + ordered.length) % ordered.length]
  const next = ordered[(index + 1) % ordered.length]

  return (
    <article>
      <nav className="detail-navigation" aria-label="Character navigation">
        <Link to={`/characters/${previous.id}`}>
          ← Previous: {previous.name}
        </Link>
        <Link to={`/characters/${next.id}`}>
          Next: {next.name} →
        </Link>
      </nav>

      <div className="detail-layout">
        <img
          className="portrait"
          src={characterImage(character.id)}
          alt={character.name}
        />

        <div>
          <h2>{character.name}</h2>
          {character.title && <p>{character.title}</p>}
          <p>{character.description || 'No description available.'}</p>

          <dl>
            <dt>Element</dt><dd>{character.vision}</dd>
            <dt>Weapon</dt><dd>{character.weapon}</dd>
            <dt>Rarity</dt><dd>{character.rarity} stars</dd>
            <dt>Nation</dt><dd>{character.nation || 'Unknown'}</dd>
          </dl>
        </div>
      </div>

      <h3>Combat talents</h3>
      {(character.skillTalents ?? []).map(talent => (
        <section key={`${talent.unlock}-${talent.name}`} className="talent">
          <h4>{talent.name}</h4>
          <p>{talent.unlock}</p>
          <p className="talent-description">{talent.description}</p>
        </section>
      ))}

      {!character.skillTalents?.length && <p>No talent information available.</p>}
    </article>
  )
}