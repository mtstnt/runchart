import { Background, Controls, ReactFlow, type Edge, type Node } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { SamplePanel } from '@/components/panels'

const nodes: Node[] = [
  { id: 'start', position: { x: 0, y: 0 }, data: { label: 'Start' }, type: 'input' },
  { id: 'print', position: { x: 0, y: 100 }, data: { label: 'Print "Hello, world!"' } },
  { id: 'end', position: { x: 0, y: 200 }, data: { label: 'End' }, type: 'output' },
]

const edges: Edge[] = [
  { id: 'start-print', source: 'start', target: 'print' },
  { id: 'print-end', source: 'print', target: 'end' },
]

const panels = [
  { id: 'panel-1', title: 'Panel 1', initialPosition: { x: 24, y: 24 } },
  { id: 'panel-2', title: 'Panel 2', initialPosition: { x: 320, y: 24 } },
]

function App() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <div className="pointer-events-none absolute inset-0 z-10">
        {panels.map((panel) => (
          <SamplePanel key={panel.id} title={panel.title} initialPosition={panel.initialPosition} />
        ))}
      </div>
    </div>
  )
}

export default App
