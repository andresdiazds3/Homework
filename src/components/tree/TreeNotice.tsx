import { useState } from 'react'

type TreeNoticeProps = {
  kind: 'error'
  message: string
}

export function TreeNotice({ kind, message }: TreeNoticeProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) {
    return null
  }

  return (
    <div className={`tree-app__notice tree-app__notice--${kind}`} role="alert">
      {message}
      <button
        className="tree-app__notice-close"
        type="button"
        aria-label="Cerrar mensaje"
        onClick={() => setIsDismissed(true)}
      >
        ×
      </button>
    </div>
  )
}