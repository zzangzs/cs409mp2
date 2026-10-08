import { Link, useParams } from 'react-router'
import { characterImage, elementIcon, nationIcon } from '../api/genshin'
import AttributeIcon from '../components/AttributeIcon'
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
  const icon = elementIcon(character.vision)
  const nationImage = nationIcon(character.nation)

  return (
    <article className="character-detail">
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

        <div className="character-summary">
          <h2 className="character-name">{character.name}</h2>
          {character.title && <p className="character-title">{character.title}</p>}
          <p className="character-description">{character.description || 'No description available.'}</p>

          <dl className="character-attributes">
            <div>
              <dt>Element</dt>
              <dd>
                <AttributeIcon key={character.vision} src={icon} label={character.vision} />
              </dd>
            </div>
            <div>
              <dt>Nation</dt>
              <dd>
                <AttributeIcon
                  key={character.nation || 'Unknown'}
                  src={nationImage}
                  label={character.nation || 'Unknown'}
                />
              </dd>
            </div>
            <div><dt>Weapon</dt><dd>{character.weapon}</dd></div>
            <div><dt>Rarity</dt><dd>{character.rarity} stars</dd></div>
          </dl>
        </div>
      </div>

      <h3 className="talents-heading">Combat talents</h3>
      {(character.skillTalents ?? []).map(talent => (
        <section key={`${talent.unlock}-${talent.name}`} className="talent">
          <p className="talent-type">{talent.unlock}</p>
          <h4>{talent.name}</h4>
          <p className="talent-description">{talent.description}</p>
        </section>
      ))}

      {!character.skillTalents?.length && <p>No talent information available.</p>}
    </article>
  )
}
