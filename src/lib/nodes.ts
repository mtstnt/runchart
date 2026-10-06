import type { Node, XYPosition } from '@xyflow/react'
import type { VariableValue } from '@/atoms'

/** Starts the program. It has no input and cannot be moved. */
export type StartNodeData = {
  label: string
}

/** Assigns a value to a variable. */
export type VariableNodeData = {
  name: string
  variable: VariableValue
}

/** Prints text or a value to the output panel. */
export type PrintNodeData = {
  expression: string
}

export type ChartStartNode = Node<StartNodeData, 'start'>
export type ChartVariableNode = Node<VariableNodeData, 'variable'>
export type ChartPrintNode = Node<PrintNodeData, 'print'>

/** Every node that can appear on the canvas, discriminated on `type`. */
export type ChartNode = ChartStartNode | ChartVariableNode | ChartPrintNode

export type ChartNodeType = ChartNode['type']

const chartNodeTypeList: readonly ChartNodeType[] = ['start', 'variable', 'print']

export function isChartNodeType(value: string): value is ChartNodeType {
  return chartNodeTypeList.includes(value as ChartNodeType)
}

/** Builds a node with the default data for its type, ready to drop on the canvas. */
export function createChartNode(type: ChartNodeType, position: XYPosition): ChartNode {
  const id = crypto.randomUUID()

  switch (type) {
    case 'start':
      return { id, type, position, data: { label: 'Start' }, draggable: false }
    case 'variable':
      return { id, type, position, data: { name: 'x', variable: { type: 'integer', value: 0 } } }
    case 'print':
      return { id, type, position, data: { expression: 'print("Hello, world!")' } }
  }
}
