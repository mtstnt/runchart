import type { RunResult } from '@/lib/run'

function formatValue(value: unknown): string {
  if (typeof value === 'string') return value
  if (value === undefined) return 'undefined'
  return JSON.stringify(value) ?? String(value)
}

export type RunOutputProps = {
  result: RunResult | null
}

/** Shows the variables and printed output after a run. */
export function RunOutput({ result }: Readonly<RunOutputProps>) {
  if (!result) {
    return <p className="text-sm text-muted-foreground">Press play to run the chart.</p>
  }

  return (
    <div className="flex flex-col gap-4 text-sm">
      <div>
        <h2 className="mb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">Status</h2>
        <p>{result.status === 'finished' ? 'Finished' : 'Error'}</p>
        {result.error && <p className="text-destructive">{result.error}</p>}
      </div>
      <div>
        <h2 className="mb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">Variables</h2>
        {Object.keys(result.variables).length === 0 ? (
          <p className="text-muted-foreground">No variables yet.</p>
        ) : (
          <dl className="flex flex-col gap-1">
            {Object.entries(result.variables).map(([name, value]) => (
              <div key={name} className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">{name}</dt>
                <dd className="font-mono">{formatValue(value)}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      <div>
        <h2 className="mb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">Output</h2>
        {result.output.length === 0 ? (
          <p className="text-muted-foreground">Nothing printed.</p>
        ) : (
          <pre className="font-mono text-xs whitespace-pre-wrap">{result.output.join('\n')}</pre>
        )}
      </div>
    </div>
  )
}
