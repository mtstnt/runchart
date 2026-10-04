import { useRef, useState, type PropsWithChildren, type PointerEvent as ReactPointerEvent } from 'react'

export type PanelPosition = { x: number; y: number }

export type BasePanelProps = {
  title: string
  initialPosition: PanelPosition
} & PropsWithChildren

export function BasePanel({ title, initialPosition, children }: BasePanelProps) {
  const [position, setPosition] = useState(initialPosition)
  const dragOffset = useRef<PanelPosition | null>(null)

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    dragOffset.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const offset = dragOffset.current
    if (!offset) return
    setPosition({ x: event.clientX - offset.x, y: event.clientY - offset.y })
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    dragOffset.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <div
      className="pointer-events-auto absolute flex h-64 w-72 flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-md"
      // Position changes while dragging, so it cannot be a static class.
      style={{ left: position.x, top: position.y }}
    >
      <div
        className="flex cursor-grab touch-none items-center border-b px-3 py-2 select-none active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <h2 className="text-sm font-medium">{title}</h2>
      </div>
      <div className="flex flex-1 flex-col gap-4 overflow-auto p-3">
        {children}
      </div>
    </div>
  )
}