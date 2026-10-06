import type { VariableValue } from '@/atoms'

export type VariableType = VariableValue['type']
export type VariableSubtype = Extract<VariableValue, { type: 'array' }>['subtype']

/** Every type a variable can have, in the order shown in the UI. */
export const variableTypes: VariableType[] = ['integer', 'float', 'string', 'boolean', 'array']

/** A safe starting value whenever a node's type changes. */
export function defaultVariableValue(type: VariableType): VariableValue {
  switch (type) {
    case 'integer':
    case 'float':
      return { type, value: 0 }
    case 'string':
      return { type, value: '' }
    case 'boolean':
      return { type, value: false }
    case 'array':
      return { type, subtype: 'integer', value: [] }
  }
}

/** Text shown in the value input. Strings are shown raw so they are easy to edit. */
export function formatVariableValue(variable: VariableValue): string {
  return variable.type === 'string' ? variable.value : JSON.stringify(variable.value)
}

function inferArraySubtype(value: unknown): VariableSubtype | null {
  if (!Array.isArray(value)) return null
  if (value.every((item) => typeof item === 'number' && Number.isInteger(item))) return 'integer'
  if (value.every((item) => typeof item === 'number')) return 'float'
  if (value.every((item) => typeof item === 'string')) return 'string'
  if (value.every((item) => typeof item === 'boolean')) return 'boolean'
  return null
}

/** Parses typed text into a value, or null when the text is not valid for the type. */
export function parseVariableValue(type: VariableType, text: string): VariableValue | null {
  switch (type) {
    case 'integer': {
      const value = Number(text)
      return text.trim() !== '' && Number.isInteger(value) ? { type, value } : null
    }
    case 'float': {
      const value = Number(text)
      return text.trim() !== '' && Number.isFinite(value) ? { type, value } : null
    }
    case 'string':
      return { type, value: text }
    case 'boolean': {
      const trimmed = text.trim()
      if (trimmed === 'true') return { type, value: true }
      if (trimmed === 'false') return { type, value: false }
      return null
    }
    case 'array': {
      let value: unknown
      try {
        value = JSON.parse(text)
      } catch {
        return null
      }
      const subtype = inferArraySubtype(value)
      return subtype ? { type, subtype, value: value as unknown[] } : null
    }
  }
}

/** Keeps the current value when it still fits the new type, otherwise falls back to a default. */
export function convertVariableValue(variable: VariableValue, type: VariableType): VariableValue {
  return parseVariableValue(type, formatVariableValue(variable)) ?? defaultVariableValue(type)
}
