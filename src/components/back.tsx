'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Undo2Icon } from 'lucide-react'

export default function BackButton() {
  const router = useRouter()

  return (
    <Button onClick={() => router.back()} variant="link" className="cursor-pointer">
      <Undo2Icon /> Back
    </Button>
  )
}
