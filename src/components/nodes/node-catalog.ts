import type { ChartNodeType } from '@/lib/nodes'
import type { BaseNodeColor } from './node.palette'

/** MIME type used to carry a node type while dragging from the palette. */
export const NODE_DRAG_TYPE = 'application/runchart-node'

export type NodeCatalogEntry = {
  type: ChartNodeType
  title: string
  color: BaseNodeColor
}

/** Nodes a user can add, shown in the sidebar and the create-node modal. */
export const nodeCatalog: NodeCatalogEntry[] = [
  { type: 'start', title: 'Start', color: 'purple' },
  { type: 'variable', title: 'Variable', color: 'yellow' },
  { type: 'print', title: 'Print', color: 'blue' },
  { type: 'assignment', title: 'Assignment', color: 'green' },
  { type: 'if', title: 'If', color: 'orange' },
  { type: 'read', title: 'Input', color: 'cyan' },
]
