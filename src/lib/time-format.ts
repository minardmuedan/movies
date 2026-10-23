export function timeAgo(date: Date | string) {
  const now = Date.now()
  const seconds = Math.floor((now - new Date(date).getTime()) / 1000)

  if (seconds < 60) return 'Just now'

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`

  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`

  const years = Math.floor(days / 365)
  return `${years}y ago`
}
