import React, {
  useMemo,
  useState,
  useCallback,
} from 'react';

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  ReactFlowProvider,
} from 'reactflow';

import 'reactflow/dist/style.css';

import { InputNode } from './nodes/inputNode';
import { OutputNode } from './nodes/outputNode';
import { LLMNode } from './nodes/llmNode';
import { TextNode } from './nodes/textNode';

import { FileUploadNode } from './nodes/fileUploadNode';
import { RouterNode } from './nodes/routerNode';
import { WebhookNode } from './nodes/webhookNode';
import { DatabaseNode } from './nodes/databaseNode';
import { TimerNode } from './nodes/timerNode';

import FlowNotification from './components/FlowNotification';
import { submitPipeline } from './submit';

const initialNodes = [
  {
    id: 'input-1',
    type: 'customInput',
    position: { x: 80, y: 120 },
    data: {},
  },
  {
    id: 'text-1',
    type: 'customText',
    position: { x: 450, y: 120 },
    data: {},
  },
  {
    id: 'llm-1',
    type: 'customLLM',
    position: { x: 850, y: 120 },
    data: {},
  },
  {
    id: 'output-1',
    type: 'customOutput',
    position: { x: 1250, y: 120 },
    data: {},
  },
];

const initialEdges = [];

function FlowBuilder() {

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [result, setResult] = useState(null);

  // NODE CHANGES
  const onNodesChange = useCallback((changes) => {
    setNodes((nds) =>
      applyNodeChanges(changes, nds)
    );
  }, []);

  // EDGE CHANGES
  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) =>
      applyEdgeChanges(changes, eds)
    );
  }, []);

  // CONNECT NODES
  const onConnect = useCallback((connection) => {

    setEdges((eds) =>
      addEdge(
        {
          ...connection,
          type: 'smoothstep',
          animated: true,
          style: {
            stroke: '#60a5fa',
            strokeWidth: 2,
          },
        },
        eds
      )
    );

  }, []);

  // NODE TYPES
  const nodeTypes = useMemo(() => ({
    customInput: InputNode,
    customOutput: OutputNode,
    customLLM: LLMNode,
    customText: TextNode,
    fileUpload: FileUploadNode,
    router: RouterNode,
    webhook: WebhookNode,
    database: DatabaseNode,
    timer: TimerNode,
  }), []);

  // SUBMIT PIPELINE
  const handleSubmit = async () => {

    try {

      const response =
        await submitPipeline(nodes, edges);

      setResult(response);

    } catch (error) {

      console.error(
        'Pipeline submission failed:',
        error
      );

      setResult({
        num_nodes: nodes.length,
        num_edges: edges.length,
        is_dag: false,
      });
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >

      {/* TOP BAR */}
      <div className="topbar">

        <div className="topbar-title">
          VectorShift Pipeline Builder
        </div>

        <button
          className="submit-button"
          onClick={handleSubmit}
        >
          Analyze Pipeline
        </button>

      </div>

      {/* FLOW */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        connectionMode="loose"
        elementsSelectable={true}
        nodesConnectable={true}
      >

        <Background
          gap={20}
          size={1}
          color="#1e293b"
        />

        <Controls />

        <MiniMap
          pannable
          zoomable
          style={{
            backgroundColor: '#0f172a',
            border: '1px solid #334155',
          }}
        />

      </ReactFlow>

      {/* RESULT */}
      <FlowNotification
        result={result}
        onClose={() => setResult(null)}
      />

    </div>
  );
}

// APP WRAPPER
export default function App() {
  return (
    <ReactFlowProvider>
      <FlowBuilder />
    </ReactFlowProvider>
  );
}