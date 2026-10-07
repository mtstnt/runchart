import type { Edge, Node } from '@xyflow/react'
import Sval from 'sval'
import type { VariableValue } from '@/atoms'
import { defaultVariableValue, type VariableType } from '@/lib/variables'

export type RunVariables = Record<string, unknown>

export type RunResult = {
  variables: RunVariables
  output: string[]
  status: 'finished' | 'error'
  error: string | null
  steps: number
}

export type RunOptions = {
  /** Safety cap so a looping chart cannot hang the tab. */
  maxSteps?: number
  /** Reads a value for an Input node. Falls back to the type's zero value. */
  ask?: (name: string, type: VariableType) => unknown
}

const MAX_STEPS = 1000

/**
 * Runs one expression in a Sval sandbox. Sandbox mode is isolated from the host
 * global scope, so user code cannot reach `globalThis` or other host globals.
 */
function evaluate(expression: string, variables: RunVariables): unknown {
  if (expression.trim() === '') return undefined
  const interpreter = new Sval({ sandBox: true })
  interpreter.import(variables)
  // `exports` is a global in script mode; mount the result so we can read it back.
  interpreter.run(`exports.__result = (${expression});`)
  return interpreter.exports.__result
}

function formatOutput(value: unknown): string {
  if (typeof value === 'string') return value
  if (value === undefined) return 'undefined'
  return JSON.stringify(value) ?? String(value)
}

function errorMessage(error: unknown): string {
  console.error(typeof error, error);
  return error instanceof Error ? error.message : String(error)
}

function nextNode(node: Node, edges: Edge[], nodesById: Map<string, Node>, branch?: boolean): Node | undefined {
  const outgoing = edges.filter((edge) => edge.source === node.id)

  if (node.type === 'if') {
    const handle = branch ? 'true' : 'false'
    const edge = outgoing.find((candidate) => candidate.sourceHandle === handle)
    return edge ? nodesById.get(edge.target) : undefined
  }

  const edge = outgoing[0]
  return edge ? nodesById.get(edge.target) : undefined
}

/** Walks the chart from Start, following edges, and returns the final state. */
export function runChart(nodes: Node[], edges: Edge[], options: RunOptions = {}): RunResult {
  const maxSteps = options.maxSteps ?? MAX_STEPS
  const variables: RunVariables = {}
  const output: string[] = []
  const nodesById = new Map(nodes.map((node) => [node.id, node]))

  const start = nodes.find((node) => node.type === 'start')
  if (!start) {
    return { variables, output, status: 'error', error: 'There is no Start node.', steps: 0 }
  }

  let current: Node | undefined = start
  let steps = 0

  while (current && steps < maxSteps) {
    steps++
    const data = current.data ?? {}

    try {
      if (current.type === 'variable') {
        const variable = data.variable as VariableValue | undefined
        variables[String(data.name)] = variable?.value
      } else if (current.type === 'assignment') {
        variables[String(data.name)] = evaluate(String(data.expression ?? ''), variables)
      } else if (current.type === 'print') {
        // The field is the expression itself, e.g. "Hello, " + name.
        output.push(formatOutput(evaluate(String(data.expression ?? ''), variables)))
      } else if (current.type === 'read') {
        const variableType = (data.variableType ?? 'string') as VariableType
        const answer = options.ask?.(String(data.name), variableType)
        variables[String(data.name)] = answer ?? defaultVariableValue(variableType).value
      } else if (current.type === 'if') {
        const condition = Boolean(evaluate(String(data.expression ?? ''), variables))
        current = nextNode(current, edges, nodesById, condition)
        continue
      }
    } catch (error) {
      return { variables, output, status: 'error', error: errorMessage(error), steps }
    }

    current = nextNode(current, edges, nodesById)
  }

  if (steps >= maxSteps) {
    return {
      variables,
      output,
      status: 'error',
      error: `Stopped after ${maxSteps} steps. Does the chart loop forever?`,
      steps,
    }
  }

  return { variables, output, status: 'finished', error: null, steps }
}
