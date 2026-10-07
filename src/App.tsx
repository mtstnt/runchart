import { addEdge, applyEdgeChanges, applyNodeChanges, Background, BackgroundVariant, Controls, MarkerType, Panel, ReactFlow, ReactFlowProvider, useReactFlow, type Connection, type DefaultEdgeOptions, type Edge, type EdgeChange, type FinalConnectionState, type FitViewOptions, type Node, type NodeChange, type XYPosition } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { NodeSelection } from '@/components/custom/nodes-selection'
import { RunControls } from '@/components/custom/run-controls'
import { RunOutput } from '@/components/custom/run-output'
import { chartNodeTypes } from '@/components/nodes/node-types'
import { NODE_DRAG_TYPE } from '@/components/nodes/node-catalog'
import { createChartNode, isChartNodeType, type ChartNodeType } from '@/lib/nodes'
import { runChart, type RunResult } from '@/lib/run'
import { parseVariableValue, type VariableType } from '@/lib/variables'
import { cn } from '@/lib/utils'
import { Trash2 } from 'lucide-react'
import React, { useCallback, useState, type DragEvent } from 'react'
import { BasePanel } from './components/panels/base.panel'
import { Button } from './components/ui/button'

const initialNodes: Node[] = [
  { id: 'start', type: 'start', position: { x: 0, y: 0 }, data: { label: 'Start' }, draggable: true },
]

// Purple, the node accent color. Defined once so initial, new and connection-line edges match.
const EDGE_COLOR = '#9333ea'

const stepEdge: DefaultEdgeOptions = {
  type: 'step',
  style: { stroke: EDGE_COLOR, strokeWidth: 3 },
  markerEnd: { type: MarkerType.Arrow, color: EDGE_COLOR, width: 14, height: 14, strokeWidth: 1.5 },
}

const fitViewOptions: FitViewOptions = {
  maxZoom: 1,
}

const ghostNodeId = 'temporary-connection-node'
const ghostEdgeId = 'temporary-connection-edge'

function FlowEditor() {
  const rf = useReactFlow();

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);

  const [modalPosition, setModalPosition] = useState<XYPosition>({ x: 0, y: 0 });
  const [currentSourceNode, setCurrentSourceNode] = useState<Node | null>(null);
  const [currentSourceHandle, setCurrentSourceHandle] = useState<string | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [runResult, setRunResult] = useState<RunResult | null>(null);

  const onNodesChange = useCallback((changes: NodeChange<Node>[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)), []);
  const onEdgesChange = useCallback((changes: EdgeChange<Edge>[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)), []);
  const onConnect = useCallback((params: Connection) => setEdges((edgesSnapshot) => addEdge({ ...params, ...stepEdge }, edgesSnapshot)), []);

  function addNodeFromPalette(type: ChartNodeType, screenPosition: XYPosition) {
    const position = rf.screenToFlowPosition(screenPosition);
    const targetNode = createChartNode(type, position);
    setNodes((nodesSnapshot) => [
      ...nodesSnapshot.filter((node) => node.id !== ghostNodeId),
      targetNode,
    ]);
    if (currentSourceNode != null) {
      setEdges((edgeSnapshot) => addEdge({
        id: `${currentSourceNode.id}-${targetNode.id}`,
        source: currentSourceNode.id,
        sourceHandle: currentSourceHandle ?? undefined,
        target: targetNode.id,
        ...stepEdge,
      }, edgeSnapshot.filter((edge) => edge.id !== ghostEdgeId)))
    }
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const type = event.dataTransfer.getData(NODE_DRAG_TYPE);
    if (!isChartNodeType(type)) return;
    addNodeFromPalette(type, { x: event.clientX, y: event.clientY });
    closeModal();
  }

  /** Closes the popup and removes the ghost node/edge it created. */
  function closeModal() {
    setNodes((nodesSnapshot) => nodesSnapshot.filter((node) => node.id !== ghostNodeId));
    setEdges((edgesSnapshot) => edgesSnapshot.filter((edge) => edge.id !== ghostEdgeId));
    setSelectedEdge(null);
    setCurrentSourceNode(null);
    setCurrentSourceHandle(null);
  }

  function onConnectEnd(_event: MouseEvent | TouchEvent, state: FinalConnectionState) {
    // Only offer a new node when the connection was dropped on empty canvas.
    if (state.toNode || !state.pointer) return;

    const sourceNode = state.fromNode;
    if (!sourceNode) return;
    const sourceHandle = state.fromHandle?.id ?? null;

    // Each output handle can leave its node only once, so a branch can use true and false.
    if (edges.some((edge) => edge.source === sourceNode.id && (edge.sourceHandle ?? null) === sourceHandle)) return;

    const position = rf.screenToFlowPosition(state.pointer);
    setModalPosition(state.pointer);
    setSelectedEdge(null);
    setCurrentSourceNode(sourceNode);
    setCurrentSourceHandle(sourceHandle);

    setNodes((nodesSnapshot) => [
      ...nodesSnapshot.filter((node) => node.id !== ghostNodeId),
      {
        id: ghostNodeId,
        position,
        data: { label: 'New node' },
        selectable: false,
        draggable: false,
        style: {
          border: `2px dashed ${EDGE_COLOR}`,
          color: EDGE_COLOR,
          opacity: 0.7,
        },
      },
    ]);

    setEdges((edgesSnapshot) => [
      ...edgesSnapshot.filter((edge) => edge.id !== ghostEdgeId),
      {
        id: ghostEdgeId,
        source: sourceNode.id,
        sourceHandle: sourceHandle ?? undefined,
        target: ghostNodeId,
        selectable: false,
        ...stepEdge,
      },
    ]);
  }

  function isValidConnection(edge: Edge | Connection) {
    const sameTarget = edges.some((e) => e.target === edge.target && (e.targetHandle ?? null) === (edge.targetHandle ?? null));
    const sameSource = edges.some((e) => e.source === edge.source && (e.sourceHandle ?? null) === (edge.sourceHandle ?? null));
    return !sameTarget && !sameSource;
  }

  function onEdgeClick(event: React.MouseEvent, edge: Edge) {
    closeModal();
    setModalPosition({ x: event.clientX, y: event.clientY });
    setSelectedEdge(edge);
  }

  function askInput(name: string, type: VariableType) {
    const raw = window.prompt(`Enter a value for "${name}" (${type})`);
    if (raw === null) return undefined;
    return parseVariableValue(type, raw)?.value;
  }

  function handleRun() {
    setRunResult(runChart(nodes, edges, { ask: askInput }));
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0" onDragOver={handleDragOver} onDrop={handleDrop}>
        <ReactFlow
          fitView
          nodes={nodes}
          edges={edges}
          nodeTypes={chartNodeTypes}
          defaultEdgeOptions={stepEdge}
          connectionLineStyle={{ stroke: EDGE_COLOR, strokeWidth: 3 }}
          fitViewOptions={fitViewOptions}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onPaneClick={closeModal}
          onEdgeClick={onEdgeClick}
          onConnectEnd={onConnectEnd}
          isValidConnection={isValidConnection}
        >
          <Background variant={BackgroundVariant.Cross} />
          <Controls />
          <Panel position="top-center">
            <RunControls onRun={handleRun} />
          </Panel>
        </ReactFlow>
      </div>
      <div className="pointer-events-none absolute inset-5 z-10">
        <BasePanel
          title="Nodes"
          initialPosition={{ x: 24, y: 320 }}
          initialSize={{ width: 300, height: 300, }}
          isResizable={false}
          dock="left"
        >
          <NodeSelection onSelect={(type) => addNodeFromPalette(type, { x: window.innerWidth / 2, y: window.innerHeight / 2 })} />
        </BasePanel>

        <BasePanel
          title="Runner"
          initialPosition={{ x: 24, y: 320 }}
          initialSize={{ width: 300, height: 300, }}
          isResizable={false}
          dock="right"
        >
          <RunOutput result={runResult} />
        </BasePanel>
      </div>
      
      {(currentSourceNode !== null || selectedEdge !== null) && (
        <div className="pointer-events-none absolute inset-0 z-20">
          <div
            className={cn(
              'pointer-events-auto absolute rounded-lg border bg-card text-card-foreground shadow-md',
              currentSourceNode !== null ? 'w-64 p-3' : 'flex items-center gap-1 p-1.5',
            )}
            style={{ left: modalPosition.x, top: modalPosition.y }}
          >
            {currentSourceNode !== null && (
              <NodeSelection onSelect={(type) => {
                addNodeFromPalette(type, modalPosition);
                closeModal();
              }} />
            )}
            {selectedEdge !== null && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setEdges((edgesSnapshot) => edgesSnapshot.filter((edge) => edge.id !== selectedEdge.id));
                  closeModal();
                }}
              >
                <Trash2 />
                Delete edge
              </Button>
            )}
          </div>
        </div>
      )}
      
    </div>
  )
}

function App() {
  return (
    <ReactFlowProvider>
      <FlowEditor />
    </ReactFlowProvider>
  )
}

export default App
