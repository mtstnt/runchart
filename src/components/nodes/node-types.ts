import type { NodeTypes } from '@xyflow/react'
import { StartNode } from './start.node'
import { VariableNode } from './variable.node'
import { PrintNode } from './print.node'

/** React Flow node-type map. Defined once at module level so nodes never remount. */
export const chartNodeTypes: NodeTypes = {
  start: StartNode,
  variable: VariableNode,
  print: PrintNode,
}
