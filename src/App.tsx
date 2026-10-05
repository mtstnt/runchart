import { addEdge, applyEdgeChanges, applyNodeChanges, Background, BackgroundVariant, Controls, ReactFlow, type Edge, type EdgeChange, type FitViewOptions, type Node, type NodeChange } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { SamplePanel, SidePanel } from '@/components/panels'
import { useCallback, useState } from 'react'

const initialNodes: Node[] = [
  { id: 'start', position: { x: 0, y: 0 }, data: { label: 'Start' }, type: 'input' },
  { id: 'print', position: { x: 0, y: 100 }, data: { label: 'Print "Hello, world!"' } },
  { id: 'end', position: { x: 0, y: 200 }, data: { label: 'End' }, type: 'output' },
]

const initialEdges: Edge[] = [
  { id: 'start-print', source: 'start', target: 'print' },
  { id: 'print-end', source: 'print', target: 'end' },
]

const fitViewOptions: FitViewOptions = {
  maxZoom: 1,
}

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback((changes: NodeChange<Node>[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)), []);
  const onEdgesChange = useCallback((changes: EdgeChange<Edge>[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)), []);
  const onConnect = useCallback((params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)), []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0">
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          fitView 
          fitViewOptions={fitViewOptions}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect} 
        >
          <Background variant={BackgroundVariant.Cross} />
          <Controls />
        </ReactFlow>
      </div>
      <div className="pointer-events-none absolute inset-5 z-10">
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
