'use client'

export default function PersonAge({ birthday }: { birthday: string }) {
  return (
    <div className="mt-12 mb-2">
      <span>Age: </span>
      {Math.floor((Date.now() - new Date(birthday).getTime()) / 31557600000)}
      <span>{` (${new Date(birthday).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long', //
        day: 'numeric',
      })})`}</span>
    </div>
  )
}
