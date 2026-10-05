import { useRef, useState, type CSSProperties, type PropsWithChildren, type ReactNode, type PointerEvent as ReactPointerEvent } from 'react'
import { Maximize2, Minus } from 'lucide-react'
import { Button } from '../ui/button'

export type PanelPosition = { x: number; y: number }
export type PanelSize = { width: number; height: number }
export type PanelDock = 'left' | 'right'

let topLayer = 0
function nextLayer() {
  return ++topLayer
}

type BasePanelProps = {
  title: string
  initialPosition: PanelPosition
  initialSize?: PanelSize

  isResizable?: boolean
  isDraggable?: boolean

  dock?: PanelDock
  onMinimizeRender?: () => ReactNode
} & PropsWithChildren

export type BasePanelPropBase = Omit<BasePanelProps, 'children'>

export function BasePanel({
  title,
  initialPosition,
  initialSize,
  onMinimizeRender,
  dock,
  isResizable = true,
  isDraggable = true,
  children,
}: BasePanelProps) {
  const [position, setPosition] = useState(initialPosition)
  const [size, setSize] = useState<PanelSize>(initialSize ?? { width: 200, height: 200 })
  const [isMinimized, setIsMinimized] = useState(false)
  const [layer, setLayer] = useState(0)
  const dragOffset = useRef<PanelPosition | null>(null)
  const resizeStart = useRef<{ pointer: PanelPosition; size: PanelSize } | null>(null)

  const canDrag = isDraggable && !dock
  const panelStyle: CSSProperties = dock
    ? {
        // Docked panels stretch from the top to the bottom of the viewport, so the height
        // follows the browser window without needing a resize listener.
        ...(dock === 'left' ? { left: 0 } : { right: 0 }),
        top: 0,
        ...(isMinimized ? { height: 'auto' } : { bottom: 0 }),
        width: size.width,
        zIndex: layer,
      }
    : {
        left: position.x,
        top: position.y,
        width: size.width,
        height: isMinimized ? 'auto' : size.height,
        zIndex: layer,
      }

  function handleActivate() {
    setLayer(nextLayer())
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (!canDrag) return
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

  function handleResizePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    resizeStart.current = {
      pointer: { x: event.clientX, y: event.clientY },
      size,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handleResizePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const start = resizeStart.current
    if (!start) return
    const deltaX = event.clientX - start.pointer.x
    if (dock) {
      const width = dock === 'right' ? start.size.width - deltaX : start.size.width + deltaX
      setSize({ width: Math.max(200, width), height: start.size.height })
      return
    }
    const deltaY = event.clientY - start.pointer.y
    setSize({
      width: Math.max(160, start.size.width + deltaX),
      height: Math.max(120, start.size.height + deltaY),
    })
  }

  function handleResizePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    resizeStart.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const rounded = dock === 'right' ? 'rounded-l-lg rounded-r-none' : dock === 'left' ? 'rounded-r-lg rounded-l-none' : 'rounded-lg'
  const resizeHandleClass = dock
    ? `absolute inset-y-0 w-1.5 cursor-ew-resize touch-none before:absolute before:inset-y-1/4 before:left-1/2 before:w-px before:-translate-x-1/2 before:bg-muted-foreground/40 ${dock === 'right' ? 'left-0' : 'right-0'}`
    : 'absolute right-0 bottom-0 size-4 cursor-nwse-resize touch-none after:absolute after:right-1 after:bottom-1 after:size-1.5 after:border-r-2 after:border-b-2 after:border-muted-foreground/50'

  return (
    <div
      className={`pointer-events-auto absolute flex flex-col overflow-hidden border bg-card text-card-foreground shadow-md ${rounded}`}
      // Position, size and layer change while dragging, resizing or on click, so they cannot be static classes.
      style={panelStyle}
      onPointerDown={handleActivate}
    >
      <div
        className={`flex touch-none items-center justify-between gap-2 border-b px-3 py-2 select-none ${canDrag ? 'cursor-grab active:cursor-grabbing' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <h2 className="text-sm font-medium">{title}</h2>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={isMinimized ? 'Expand panel' : 'Minimize panel'}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => setIsMinimized((value) => !value)}
        >
          {isMinimized ? <Maximize2 /> : <Minus />}
        </Button>
      </div>
      {isMinimized ? (
        <div className="flex flex-col gap-4 p-3">{onMinimizeRender?.()}</div>
      ) : (
        <div className="flex flex-1 flex-col gap-4 overflow-auto p-3">{children}</div>
      )}
      {isResizable && !isMinimized && (
        <div
          className={resizeHandleClass}
          onPointerDown={handleResizePointerDown}
          onPointerMove={handleResizePointerMove}
          onPointerUp={handleResizePointerUp}
          onPointerCancel={handleResizePointerUp}
        />
      )}
    </div>
  )
}
