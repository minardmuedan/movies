'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Undo2Icon } from 'lucide-react'
import { cn } from 'cn'

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter()

  return (
    <Button variant="link" className={cn('cursor-pointer', className)} onClick={() => router.back()}>
      <Undo2Icon /> Back
    </Button>
  )
}
