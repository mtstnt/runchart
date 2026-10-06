import { Handle, Position } from '@xyflow/react'
import { cn } from '@/lib/utils'

const handleClass = '!size-2.5 !border-2 !border-white'

type NodeHandlesProps = {
  /** Inputs connect on the left, outputs on the right, so the flow reads left to right. */
  type: 'target' | 'source'
  /** Handles stack vertically, centered with an even gap. */
  count?: number
  className?: string
}

export function NodeHandles({ type, count = 1, className }: NodeHandlesProps) {
  const position = type === 'target' ? Position.Left : Position.Right

  return Array.from({ length: count }, (_, index) => (
    <Handle
      key={index}
      id={`${type}-${index}`}
      type={type}
      position={position}
      className={cn(handleClass, className)}
      style={{ top: `${((index + 1) / (count + 1)) * 100}%` }}
    />
  ))
}
