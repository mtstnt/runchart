import type { NodeProps } from '@xyflow/react'
import { NodeHandles } from './node.handles'
import type { ChartStartNode } from '@/lib/nodes'

export function StartNode({ data }: NodeProps<ChartStartNode>) {
  return (
    <div className="flex size-16 items-center justify-center rounded-full bg-purple-600 text-sm font-semibold text-white shadow-md">
      {data.label}
      <NodeHandles type="source" className="!bg-purple-600" />
    </div>
  )
}
