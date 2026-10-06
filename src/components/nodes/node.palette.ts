/**
 * BaseNode colors.
 *
 * Tailwind only generates classes it can find as literal text, so template
 * strings like `bg-${color}-100` do not work. Every hue is listed here with the
 * same shade steps (surface 100, border/handle 500, heading 700, ink 950).
 * Add a hue to make it available to `<BaseNode baseColor="..." />`.
 */
export type NodePalette = {
  surface: string
  border: string
  divider: string
  heading: string
  ink: string
  handle: string
}

export const nodePalettes = {
  slate: { surface: 'bg-slate-100', border: 'border-slate-500', divider: 'border-slate-500/40', heading: 'text-slate-700', ink: 'text-slate-950', handle: '!bg-slate-500' },
  gray: { surface: 'bg-gray-100', border: 'border-gray-500', divider: 'border-gray-500/40', heading: 'text-gray-700', ink: 'text-gray-950', handle: '!bg-gray-500' },
  zinc: { surface: 'bg-zinc-100', border: 'border-zinc-500', divider: 'border-zinc-500/40', heading: 'text-zinc-700', ink: 'text-zinc-950', handle: '!bg-zinc-500' },
  neutral: { surface: 'bg-neutral-100', border: 'border-neutral-500', divider: 'border-neutral-500/40', heading: 'text-neutral-700', ink: 'text-neutral-950', handle: '!bg-neutral-500' },
  stone: { surface: 'bg-stone-100', border: 'border-stone-500', divider: 'border-stone-500/40', heading: 'text-stone-700', ink: 'text-stone-950', handle: '!bg-stone-500' },
  red: { surface: 'bg-red-100', border: 'border-red-500', divider: 'border-red-500/40', heading: 'text-red-700', ink: 'text-red-950', handle: '!bg-red-500' },
  orange: { surface: 'bg-orange-100', border: 'border-orange-500', divider: 'border-orange-500/40', heading: 'text-orange-700', ink: 'text-orange-950', handle: '!bg-orange-500' },
  amber: { surface: 'bg-amber-100', border: 'border-amber-500', divider: 'border-amber-500/40', heading: 'text-amber-700', ink: 'text-amber-950', handle: '!bg-amber-500' },
  yellow: { surface: 'bg-yellow-100', border: 'border-yellow-500', divider: 'border-yellow-500/40', heading: 'text-yellow-700', ink: 'text-yellow-950', handle: '!bg-yellow-500' },
  lime: { surface: 'bg-lime-100', border: 'border-lime-500', divider: 'border-lime-500/40', heading: 'text-lime-700', ink: 'text-lime-950', handle: '!bg-lime-500' },
  green: { surface: 'bg-green-100', border: 'border-green-500', divider: 'border-green-500/40', heading: 'text-green-700', ink: 'text-green-950', handle: '!bg-green-500' },
  emerald: { surface: 'bg-emerald-100', border: 'border-emerald-500', divider: 'border-emerald-500/40', heading: 'text-emerald-700', ink: 'text-emerald-950', handle: '!bg-emerald-500' },
  teal: { surface: 'bg-teal-100', border: 'border-teal-500', divider: 'border-teal-500/40', heading: 'text-teal-700', ink: 'text-teal-950', handle: '!bg-teal-500' },
  cyan: { surface: 'bg-cyan-100', border: 'border-cyan-500', divider: 'border-cyan-500/40', heading: 'text-cyan-700', ink: 'text-cyan-950', handle: '!bg-cyan-500' },
  sky: { surface: 'bg-sky-100', border: 'border-sky-500', divider: 'border-sky-500/40', heading: 'text-sky-700', ink: 'text-sky-950', handle: '!bg-sky-500' },
  blue: { surface: 'bg-blue-100', border: 'border-blue-500', divider: 'border-blue-500/40', heading: 'text-blue-700', ink: 'text-blue-950', handle: '!bg-blue-500' },
  indigo: { surface: 'bg-indigo-100', border: 'border-indigo-500', divider: 'border-indigo-500/40', heading: 'text-indigo-700', ink: 'text-indigo-950', handle: '!bg-indigo-500' },
  violet: { surface: 'bg-violet-100', border: 'border-violet-500', divider: 'border-violet-500/40', heading: 'text-violet-700', ink: 'text-violet-950', handle: '!bg-violet-500' },
  purple: { surface: 'bg-purple-100', border: 'border-purple-500', divider: 'border-purple-500/40', heading: 'text-purple-700', ink: 'text-purple-950', handle: '!bg-purple-500' },
  fuchsia: { surface: 'bg-fuchsia-100', border: 'border-fuchsia-500', divider: 'border-fuchsia-500/40', heading: 'text-fuchsia-700', ink: 'text-fuchsia-950', handle: '!bg-fuchsia-500' },
  pink: { surface: 'bg-pink-100', border: 'border-pink-500', divider: 'border-pink-500/40', heading: 'text-pink-700', ink: 'text-pink-950', handle: '!bg-pink-500' },
  rose: { surface: 'bg-rose-100', border: 'border-rose-500', divider: 'border-rose-500/40', heading: 'text-rose-700', ink: 'text-rose-950', handle: '!bg-rose-500' },
} satisfies Record<string, NodePalette>

export type BaseNodeColor = keyof typeof nodePalettes
