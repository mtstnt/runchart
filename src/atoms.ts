import { atom } from "jotai";

type NodeState = {};
type EdgeState = {};

export type ChartAtom = {
  nodes: NodeState[]
  edges: EdgeState[]
}

export const chartAtom = atom<ChartAtom>()

export type VariableValue = {
  type: 'integer',
  value: number,
} | {
  type: 'float',
  value: number,
} | {
  type: 'string',
  value: string,
} | {
  type: 'boolean',
  value: boolean,
} | {
  type: 'array',
  subtype: 'integer' | 'float' | 'string' | 'boolean',
  value: Array<any>,
}

export type VariableDataState = {
  [x: string]: VariableValue,
}

// When a new scope is created, push a new layer onto the stack's top.
// When the scope is exited, pop the topmost layer.
// When searching for variables, look from the topmost layer below.
export type RunningStateAtom = {
  variables: VariableDataState[],
  currentStepNodeId: string,
}

export const runningStateAtom = atom<RunningStateAtom>()