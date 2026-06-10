// ui.js
// Displays the drag-and-drop UI


import {
  useState,
  useRef,
  useCallback,
} from 'react';

import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  ConnectionMode,
} from 'reactflow';

import { useStore } from './store';
import { shallow } from 'zustand/shallow';

import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';

import 'reactflow/dist/style.css';

const gridSize = 20;

const proOptions = {
  hideAttribution: true,
};

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);

  const [reactFlowInstance, setReactFlowInstance] =
    useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    return {
      id: nodeID,
      nodeType: type,
    };
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds =
        reactFlowWrapper.current.getBoundingClientRect();

      const rawData =
        event.dataTransfer.getData(
          'application/reactflow'
        );

      if (!rawData) return;

      const appData = JSON.parse(rawData);

      const type = appData?.nodeType;

      if (!type || !reactFlowInstance) {
        return;
      }

      const position =
        reactFlowInstance.screenToFlowPosition({
          x:
            event.clientX -
            reactFlowBounds.left,
          y:
            event.clientY -
            reactFlowBounds.top,
        });

      const nodeID = getNodeID(type);

      const newNode = {
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      };

      addNode(newNode);
    },
    [
      reactFlowInstance,
      addNode,
      getNodeID,
    ]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();

    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div
      ref={reactFlowWrapper}
      style={{
        width: '100vw',
        height: '70vh',
      }}
    >
      <ReactFlow
        fitView
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionMode={ConnectionMode.Loose}
        connectionLineType="smoothstep"
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={(params) => {
          console.log(
            'CONNECTED:',
            params
          );

          onConnect(params);
        }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
      >
        <Background
          color="#334155"
          gap={gridSize}
        />

        <Controls />

        <MiniMap
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  );
};