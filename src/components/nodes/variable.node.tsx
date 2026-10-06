import { useReactFlow, type NodeProps } from '@xyflow/react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { BaseNode } from './base.node'
import type { ChartVariableNode } from '@/lib/nodes'
import { convertVariableValue, formatVariableValue, parseVariableValue, variableTypes, type VariableType } from '@/lib/variables'

export function VariableNode({ id, data }: NodeProps<ChartVariableNode>) {
  const { updateNodeData } = useReactFlow<ChartVariableNode>()
  const [valueText, setValueText] = useState(() => formatVariableValue(data.variable))

  function handleValueChange(text: string) {
    setValueText(text)
    const parsed = parseVariableValue(data.variable.type, text)
    if (parsed) updateNodeData(id, { variable: parsed })
  }

  function handleTypeChange(type: VariableType) {
    const variable = convertVariableValue(data.variable, type)
    setValueText(formatVariableValue(variable))
    updateNodeData(id, { variable })
  }

  return (
    <BaseNode title="Variable" baseColor="yellow" className="w-56">
      <label className="flex items-center justify-between gap-3">
        <span className="opacity-70">Name</span>
        <Input
          className="nodrag nowheel h-6 w-28 text-xs"
          value={data.name}
          onChange={(event) => updateNodeData(id, { name: event.target.value })}
        />
      </label>
      <label className="flex items-center justify-between gap-3">
        <span className="opacity-70">Type</span>
        <select
          className="nodrag nowheel h-6 w-28 cursor-pointer rounded-lg border border-input bg-transparent px-1.5 text-xs capitalize"
          value={data.variable.type}
          onChange={(event) => handleTypeChange(event.target.value as VariableType)}
        >
          {variableTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </label>
      <label className="flex items-center justify-between gap-3">
        <span className="opacity-70">Value</span>
        <Input
          className="nodrag nowheel h-6 w-28 font-mono text-xs"
          value={valueText}
          onChange={(event) => handleValueChange(event.target.value)}
          onBlur={() => setValueText(formatVariableValue(data.variable))}
        />
      </label>
    </BaseNode>
  )
}
