'use client'

import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <button onClick={() => router.back()} className='py-2 px-3 bg-black text-white font-medium text-sm'>
      Back
    </button>
  )
}
