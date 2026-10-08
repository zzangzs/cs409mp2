import { useState } from 'react'

interface Props {
  src?: string
  label: string
}

export default function AttributeIcon({ src, label }: Props) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) return <>{label}</>

  return (
    <span className="attribute-icon-label" tabIndex={0} role="img" aria-label={label}>
      <img
        className="attribute-icon"
        src={src}
        alt=""
        width="48"
        height="48"
        onError={() => setFailed(true)}
      />
      <span className="attribute-tooltip" aria-hidden="true">{label}</span>
    </span>
  )
}
