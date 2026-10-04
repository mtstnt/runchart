import { Background, Controls, ReactFlow, type Edge, type Node } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Button } from '@/components/ui/button'

const nodes: Node[] = [
  { id: 'start', position: { x: 0, y: 0 }, data: { label: 'Start' }, type: 'input' },
  { id: 'print', position: { x: 0, y: 100 }, data: { label: 'Print "Hello, world!"' } },
  { id: 'end', position: { x: 0, y: 200 }, data: { label: 'End' }, type: 'output' },
]

const edges: Edge[] = [
  { id: 'start-print', source: 'start', target: 'print' },
  { id: 'print-end', source: 'print', target: 'end' },
]

function App() {
  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <header className="flex items-center justify-between border-b px-4 py-2">
        <h1 className="text-lg font-semibold">RunChart</h1>
        <div className="flex gap-2">
          <Button variant="outline">Import</Button>
          <Button variant="outline">Export</Button>
          <Button>Run</Button>
        </div>
      </header>
      <div className="flex min-h-0 flex-1">
        <aside className="w-56 border-r p-4">
          <h2 className="mb-2 text-sm font-medium text-muted-foreground">Nodes</h2>
          <ul className="space-y-1 text-sm">
            <li className="rounded-md border px-3 py-2">Start</li>
            <li className="rounded-md border px-3 py-2">Print</li>
            <li className="rounded-md border px-3 py-2">End</li>
          </ul>
        </aside>
        <main className="flex-1">
          <ReactFlow nodes={nodes} edges={edges} fitView>
            <Background />
            <Controls />
          </ReactFlow>
        </main>
      </div>
    </div>
  )
}

export default App
