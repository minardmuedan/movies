'use client'

import { cn } from 'cn'
import { RotateCcwIcon, TriangleAlertIcon } from 'lucide-react'
import { Button } from './button'

const Fallback = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div className={cn('flex min-h-62 flex-col items-center justify-center rounded-lg border-2 border-dashed text-center', className)}>
      {children}
    </div>
  )
}

const EmptyFallback = () => {
  return <Fallback className="border-muted-foreground text-muted-foreground">No Result</Fallback>
}

const ErrorFallback = ({ message, className }: { message: string; className?: string }) => {
  return (
    <Fallback className={cn('border-destructive/50 text-destructive', className)}>
      <TriangleAlertIcon className="mb-6 size-8" />
      <div className="text-xl">{message}</div>
      <div className="sm-muted mb-6">Try to reload the page.</div>

      <Button onClick={() => window.location.reload()}>
        <RotateCcwIcon />
        Reload
      </Button>
    </Fallback>
  )
}

export { EmptyFallback, ErrorFallback }
