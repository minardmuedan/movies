'use client'

import { useState } from 'react'

const MAX_WORDS = 80

export default function ExpandableText({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ')

  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {words.length > MAX_WORDS ? (
        <>
          <p className="inline">{isExpanded ? text : `${words.slice(0, MAX_WORDS).join(' ')} ...`}</p>

          <button className="text-primary ml-2 transition-opacity hover:opacity-75" onClick={() => setIsExpanded((v) => !v)}>
            {isExpanded ? 'see less' : 'see more'}
          </button>
        </>
      ) : (
        <p> text</p>
      )}
    </div>
  )
}
