import { useReactFlow, type NodeProps } from '@xyflow/react'
import { Input } from '@/components/ui/input'
import { BaseNode } from './base.node'
import type { ChartIfNode } from '@/lib/nodes'

const outputIds = ['true', 'false']
const outputLabels = ['TRUE', 'FALSE']

export function IfNode({ id, data }: NodeProps<ChartIfNode>) {
  const { updateNodeData } = useReactFlow<ChartIfNode>()

  return (
    <BaseNode
      title="If"
      baseColor="orange"
      className="w-56"
      outputCount={2}
      outputIds={outputIds}
      outputLabels={outputLabels}
    >
      <Input
        className="nodrag nowheel h-6 font-mono text-xs"
        value={data.expression}
        placeholder="x > 0"
        onChange={(event) => updateNodeData(id, { expression: event.target.value })}
      />
    </BaseNode>
  )
}
