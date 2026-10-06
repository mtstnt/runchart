import type { NodeProps } from '@xyflow/react'
import { BaseNode } from './base.node'
import type { ChartVariableNode, VariableNodeData } from '@/lib/nodes'

function describeType(variable: VariableNodeData['variable']) {
  return variable.type === 'array' ? `array of ${variable.subtype}` : variable.type
}

export function VariableNode({ data }: NodeProps<ChartVariableNode>) {
  return (
    <BaseNode title="Variable" baseColor="yellow">
      <div className="flex items-center justify-between gap-3">
        <span className="opacity-70">Name</span>
        <span className="font-medium">{data.name}</span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="opacity-70">Type</span>
        <span className="font-medium">{describeType(data.variable)}</span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="opacity-70">Value</span>
        <span className="max-w-24 truncate font-mono">{JSON.stringify(data.variable.value)}</span>
      </div>
    </BaseNode>
  )
}
