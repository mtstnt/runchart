import { GripVertical } from 'lucide-react'
import { NODE_DRAG_TYPE, nodeCatalog } from '@/components/nodes/node-catalog'
import { nodePalettes } from '@/components/nodes/node.palette'
import type { ChartNodeType } from '@/lib/nodes'
import { cn } from '@/lib/utils'

export type NodeSelectionProps = {
  /** Called when a node is clicked. Dragging is handled by the canvas drop target. */
  onSelect: (type: ChartNodeType) => void
}

const FIXED_NODE_TYPES = new Set(["start", "end"]);

export function NodeSelection({ onSelect }: Readonly<NodeSelectionProps>) {
  return (
    <div className="flex flex-col gap-2">
      {nodeCatalog.filter(e => !FIXED_NODE_TYPES.has(e.type)).map(({ type, title, color }) => {
        const palette = nodePalettes[color]

        return (
          <div
            key={type}
            role="button"
            tabIndex={0}
            draggable
            onClick={() => onSelect(type)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onSelect(type)
              }
            }}
            onDragStart={(event) => {
              event.dataTransfer.setData(NODE_DRAG_TYPE, type)
              event.dataTransfer.effectAllowed = 'move'
            }}
            className={cn(
              'flex cursor-grab items-center gap-2 rounded-lg border-2 px-3 py-2 select-none',
              'focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:cursor-grabbing',
              palette.surface,
              palette.ink,
              palette.border,
            )}
          >
            <GripVertical className="size-4 opacity-50" />
            <span className="flex flex-col text-left">
              <span className="text-sm font-medium">{title}</span>
            </span>
          </div>
        )
      })}
    </div>
  )
}
