import { useReactFlow, type NodeProps } from '@xyflow/react'
import { Input } from '@/components/ui/input'
import { BaseNode } from './base.node'
import type { ChartPrintNode } from '@/lib/nodes'

export function PrintNode({ id, data }: NodeProps<ChartPrintNode>) {
  const { updateNodeData } = useReactFlow<ChartPrintNode>()

  return (
    <BaseNode title="Print" baseColor="blue" className="w-56">
      <Input
        className="nodrag nowheel h-7 bg-white/80 font-mono text-xs"
        value={data.expression}
        placeholder='print("Hello, world!")'
        onChange={(event) => updateNodeData(id, { expression: event.target.value })}
      />
    </BaseNode>
  )
}
