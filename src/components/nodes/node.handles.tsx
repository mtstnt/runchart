import { Fragment } from 'react'
import { Handle, Position } from '@xyflow/react'
import { cn } from '@/lib/utils'

const handleClass = '!size-2.5 !border-2 !border-white'

type NodeHandlesProps = {
  /** Inputs connect on the left, outputs on the right, so the flow reads left to right. */
  type: 'target' | 'source'
  /** Handles stack vertically, centered with an even gap. */
  count?: number
  className?: string
  /** Explicit handle ids. Required when a node has several handles of the same type. */
  ids?: string[]
  /** Labels shown inside the node, next to each handle. */
  labels?: string[]
}

export function NodeHandles({ type, count = 1, className, ids, labels }: NodeHandlesProps) {
  const position = type === 'target' ? Position.Left : Position.Right

  return Array.from({ length: count }, (_, index) => {
    const top = `${((index + 1) / (count + 1)) * 100}%`
    // A lone handle stays anonymous so existing edges keep matching it.
    const id = ids?.[index] ?? (count > 1 ? `${type}-${index}` : undefined)
    const label = labels?.[index]

    return (
      <Fragment key={id ?? index}>
        <Handle
          id={id}
          type={type}
          position={position}
          className={cn(handleClass, className)}
          style={{ top }}
        />
        {label && (
          <span
            className={cn(
              'pointer-events-none absolute -translate-y-1/2 text-[10px] font-semibold bg-white p-1 rounded',
              position === Position.Right ? 'right-1' : 'left-1',
            )}
            style={{ top }}
          >
            {label}
          </span>
        )}
      </Fragment>
    )
  })
}
