import { Background, Controls, ReactFlow, type Edge, type Node } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { SamplePanel, SidePanel } from '@/components/panels'

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
    <div className="relative h-screen w-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <div className="pointer-events-none absolute inset-0 z-10">
        <SamplePanel initialPosition={{ x: 0, y: 0 }} title='Test' />
        <SidePanel 
          title="Side Panel" 
          initialPosition={{ x: 24, y: 320 }}
          initialSize={{ width: 300, height: 300, }}
          isResizable={false}
        />
      </div>
    </div>
  )
}

export default App
