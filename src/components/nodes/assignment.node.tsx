import { useReactFlow, type NodeProps } from '@xyflow/react'
import { Input } from '@/components/ui/input'
import { BaseNode } from './base.node'
import type { ChartAssignmentNode } from '@/lib/nodes'

export function AssignmentNode({ id, data }: NodeProps<ChartAssignmentNode>) {
  const { updateNodeData } = useReactFlow<ChartAssignmentNode>()

  return (
    <BaseNode title="Assignment" baseColor="green" className="w-56">
      <div className="flex items-center gap-2">
        <Input
          className="nodrag nowheel h-6 w-20 text-xs"
          value={data.name}
          placeholder="name"
          onChange={(event) => updateNodeData(id, { name: event.target.value })}
        />
        <span className="opacity-70">=</span>
        <Input
          className="nodrag nowheel h-6 min-w-0 flex-1 font-mono text-xs"
          value={data.expression}
          placeholder="expression"
          onChange={(event) => updateNodeData(id, { expression: event.target.value })}
        />
      </div>
    </BaseNode>
  )
}
