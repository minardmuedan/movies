'use client'

import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'

interface TagInputProps {
  value?: string[]
  onChange?: (tags: string[]) => void
  placeholder?: string
  maxTags?: number
  className?: string
  disabled?: boolean
}

export function TagInput({ value, onChange, placeholder = 'Add a keyword and press Enter', maxTags, className, disabled }: TagInputProps) {
  const [internalTags, setInternalTags] = useState<string[]>([])
  const tags = value ?? internalTags

  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const setTags = (next: string[]) => {
    if (value === undefined) setInternalTags(next)
    onChange?.(next)
  }

  const addTag = (raw: string) => {
    const tag = raw.trim()
    if (!tag) return
    if (maxTags && tags.length >= maxTags) return

    if (tags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
      setInput('')
      return
    }

    setTags([...tags, tag])
    setInput('')
  }

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index))
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(input)
    } else if (e.key === 'Backspace' && input === '' && tags.length > 0) {
      // backspace on empty input removes the last tag
      removeTag(tags.length - 1)
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text')
    if (!text.includes(',')) return
    e.preventDefault()
    const parts = text.split(',')
    const next = [...tags]
    for (const p of parts) {
      const t = p.trim()
      if (!t) continue
      if (maxTags && next.length >= maxTags) break
      if (next.some((x) => x.toLowerCase() === t.toLowerCase())) continue
      next.push(t)
    }
    setTags(next)
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={cn(
        'border-input bg-background flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-md border px-3 py-2 text-sm',
        'focus-within:ring-ring focus-within:ring-offset-background focus-within:ring-2 focus-within:ring-offset-2',
        disabled && 'pointer-events-none opacity-50',
        className,
      )}
    >
      {tags.map((tag, i) => (
        <Badge key={tag} variant="secondary" className="max-w-full gap-1 pr-1 text-sm font-normal">
          <div className="overflow-hidden text-ellipsis">{tag}</div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              removeTag(i)
            }}
            aria-label={`Remove ${tag}`}
            className="hover:bg-muted-foreground/20 focus-visible:ring-ring rounded-full p-0.5 focus:outline-none focus-visible:ring-1"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onBlur={() => addTag(input)}
        disabled={disabled}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="placeholder:text-muted-foreground min-w-32 flex-1 bg-transparent outline-none"
      />
    </div>
  )
}
