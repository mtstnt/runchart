import { Bug, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

/** Floating run/debug controls shown at the top of the canvas. */
export function RunControls() {
  return (
    <div className="flex items-center gap-2 rounded-lg border bg-card p-1.5 shadow-md">
      <Button type="button" size="icon-lg" aria-label="Run program">
        <Play className="size-5" />
      </Button>
      <Button type="button" variant="outline" size="icon-sm" aria-label="Debug program">
        <Bug />
      </Button>
    </div>
  )
}
