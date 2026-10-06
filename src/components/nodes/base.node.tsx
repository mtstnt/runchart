import type { PropsWithChildren } from 'react'
import { NodeHandles } from './node.handles'
import { nodePalettes, type BaseNodeColor } from './node.palette'
import { cn } from '@/lib/utils'

export type BaseNodeProp = {
  title: string
  inputCount?: number
  outputCount?: number
  /** Explicit output handle ids, for nodes with several outputs (e.g. true/false). */
  outputIds?: string[]
  /** Labels shown inside the node next to each output handle. */
  outputLabels?: string[]
  /** Hue name from `nodePalettes`, e.g. "purple". */
  baseColor?: BaseNodeColor
  /** Hue for the border and header divider. Defaults to `baseColor`. */
  borderColor?: BaseNodeColor
  className?: string
} & PropsWithChildren

export function BaseNode({
  title,
  inputCount = 1,
  outputCount = 1,
  outputIds,
  outputLabels,
  baseColor = 'yellow',
  borderColor = baseColor,
  className,
  children,
}: Readonly<BaseNodeProp>) {
  const palette = nodePalettes[baseColor]
  const borderPalette = nodePalettes[borderColor]

  return (
    <div className={cn('w-48 rounded-lg border-2 text-sm shadow-md', palette.surface, palette.ink, borderPalette.border, className)}>
      <NodeHandles type="target" count={inputCount} className={palette.handle} />
      <div className={cn('border-b px-3 py-1.5 text-xs font-semibold tracking-wide uppercase', borderPalette.divider, palette.heading)}>
        {title}
      </div>
      <div className="flex flex-col gap-1 px-3 py-2">{children}</div>
      <NodeHandles type="source" count={outputCount} ids={outputIds} labels={outputLabels} className={palette.handle} />
    </div>
  )
}
