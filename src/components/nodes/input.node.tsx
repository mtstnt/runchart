import { useReactFlow, type NodeProps } from '@xyflow/react'
import { Input } from '@/components/ui/input'
import { BaseNode } from './base.node'
import type { ChartInputNode } from '@/lib/nodes'
import { variableTypes, type VariableType } from '@/lib/variables'

export function InputNode({ id, data }: NodeProps<ChartInputNode>) {
  const { updateNodeData } = useReactFlow<ChartInputNode>()

  return (
    <BaseNode title="Input" baseColor="cyan" className="w-56">
      <label className="flex items-center justify-between gap-3">
        <span className="opacity-70">Name</span>
        <Input
          className="nodrag nowheel h-6 w-28 text-xs"
          value={data.name}
          placeholder="name"
          onChange={(event) => updateNodeData(id, { name: event.target.value })}
        />
      </label>
      <label className="flex items-center justify-between gap-3">
        <span className="opacity-70">Type</span>
        <select
          className="nodrag nowheel h-6 w-28 cursor-pointer rounded-lg border border-input bg-transparent px-1.5 text-xs capitalize"
          value={data.variableType}
          onChange={(event) => updateNodeData(id, { variableType: event.target.value as VariableType })}
        >
          {variableTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </label>
    </BaseNode>
  )
}
