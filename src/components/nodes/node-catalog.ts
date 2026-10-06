import type { ChartNodeType } from '@/lib/nodes'
import type { BaseNodeColor } from './node.palette'

/** MIME type used to carry a node type while dragging from the palette. */
export const NODE_DRAG_TYPE = 'application/runchart-node'

export type NodeCatalogEntry = {
  type: ChartNodeType
  title: string
  description: string
  color: BaseNodeColor
}

/** Nodes a user can add, shown in the sidebar and the create-node modal. */
export const nodeCatalog: NodeCatalogEntry[] = [
  { type: 'start', title: 'Start', description: 'Where the program begins', color: 'purple' },
  { type: 'variable', title: 'Variable', description: 'Store a value', color: 'yellow' },
  { type: 'print', title: 'Print', description: 'Show text or a value', color: 'blue' },
]
