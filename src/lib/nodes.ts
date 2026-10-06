import type { Node, XYPosition } from '@xyflow/react'
import type { VariableValue } from '@/atoms'
import type { VariableType } from '@/lib/variables'

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

/** Assigns the result of an expression to a variable. */
export type AssignmentNodeData = {
  name: string
  expression: string
}

/** Branches: runs the true or false path depending on an expression. */
export type IfNodeData = {
  expression: string
}

/** Reads a value typed by the user at run time. */
export type InputNodeData = {
  name: string
  variableType: VariableType
}

export type ChartStartNode = Node<StartNodeData, 'start'>
export type ChartVariableNode = Node<VariableNodeData, 'variable'>
export type ChartPrintNode = Node<PrintNodeData, 'print'>
export type ChartAssignmentNode = Node<AssignmentNodeData, 'assignment'>
export type ChartIfNode = Node<IfNodeData, 'if'>
export type ChartInputNode = Node<InputNodeData, 'read'>

/** Every node that can appear on the canvas, discriminated on `type`. */
export type ChartNode = ChartStartNode | ChartVariableNode | ChartPrintNode | ChartAssignmentNode | ChartIfNode | ChartInputNode

export type ChartNodeType = ChartNode['type']

const chartNodeTypeList: readonly ChartNodeType[] = ['start', 'variable', 'print', 'assignment', 'if', 'read']

export function isChartNodeType(value: string): value is ChartNodeType {
  return chartNodeTypeList.includes(value as ChartNodeType)
}

/** Builds a node with the default data for its type, ready to drop on the canvas. */
export function createChartNode(type: ChartNodeType, position: XYPosition): ChartNode {
  const id = `${type}-${crypto.randomUUID()}`

  switch (type) {
    case 'start':
      return { id, type, position, data: { label: 'Start' }, draggable: false }
    case 'variable':
      return { id, type, position, data: { name: 'x', variable: { type: 'integer', value: 0 } } }
    case 'print':
      return { id, type, position, data: { expression: 'print("Hello, world!")' } }
    case 'assignment':
      return { id, type, position, data: { name: 'x', expression: '0' } }
    case 'if':
      return { id, type, position, data: { expression: 'x > 0' } }
    case 'read':
      return { id, type, position, data: { name: 'x', variableType: 'integer' } }
  }
}
