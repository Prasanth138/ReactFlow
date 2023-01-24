import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MiniMap,
  Panel,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { Stack, VStack, Box, Button,Checkbox } from "@chakra-ui/react";
import "./Flow.css";


const initialNodes = [
  {
    id: 'A',
    type: 'group',
    position: { x: 100, y: -120 },
    style: {
      width: 170,
      height: 140,
    },
  },
  {
    id: 'A-1',
    type: 'input',
    data: { label: 'Child Node 1' },
    position: { x: 10, y: 10 },
    parentNode: 'A',
    extent: 'parent',
    style: { backgroundColor: "#6ede87", color: "white" },
  },
  {
    id: 'A-2',
    data: { label: 'Child Node 2' },
    position: { x: 10, y: 90 },
    parentNode: 'A',
    extent: 'parent',
    style: { backgroundColor: "#ff0072", color: "white" },
  },
  {
    id: 'B',
    type: 'output',
    position: { x: -100, y: 90 },
    data: { label: 'Node A' },
    style: { backgroundColor: "#6865A5", color: "white" },
  },
  {
    id: 'C',
    type: 'output',
    position: { x: 150, y: 90 },
    data: { label: 'Node B' },
    className: 'circle',
    style: { backgroundColor: "#6865A5", color: "white" },
  },
  {
    id: 'D',
    type: 'output',
    position: { x: 300, y: 80 },
    data: { label: 'Node C' },
    style: { backgroundColor: "#6865A5", color: "white" },
  },
];


const initialEdges = [
  {
    id: "a1-a2",
    source: "A-1",
    target: "A-2",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "a2-b",
    source: "A-2",
    target: "B",
    animated: true,
    label: "Animated Edge",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: "#FFCC00", color: "#fff", fillOpacity: 0.7 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    markerStart: {
      type: MarkerType.ArrowClosed,
      orient: 'auto-start-reverse',
    },
  },
  {
    id: "a2-c",
    source: "A-2",
    target: "C",
    style: {
      strokeWidth: 1,
      stroke: '#FF0072',
    },
    markerStart: {
      type: MarkerType.ArrowClosed,
      orient: 'auto-start-reverse',
      color: '#FF0072',
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#FF0072',
    },
  },
  {
    id: "a2-c",
    source: "A-2",
    target: "D",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: "#FFCC00", color: "#fff", fillOpacity: 0.7 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  }
];

const nodeColor = (node) => {
  switch (node.type) {
    case "input":
      return "#6ede87";
    case "output":
      return "#6865A5";
    default:
      return "#ff0072";
  }
};


const hide = (hidden) => (nodeOrEdge) => {
  nodeOrEdge.hidden = hidden;
  return nodeOrEdge;
};


function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [variant, setVariant] = useState('cross');
  const [hidden, setHidden] = useState(false);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  useEffect(() => {
    setEdges((eds) => eds.map(hide(hidden)));
  }, [hidden]);


  return (
    <Stack bg="blue.50">
      <VStack bg="blue.200">
        <Box
          w={["sm", "2xl"]}
          h={["sm", "xl"]}
          m={2}
          bg="green.50"
          display="flex"
          justifyContent="center"
          alignItems="center"
          border="1px solid black"
        >
          <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background color="#99b3ec" variant={variant} />
            <Panel position="top-left">
              <Box>Background variant:</Box>
              <Button mx={1} onClick={() => setVariant("dots")}>
                dots
              </Button>
              <Button mx={1} onClick={() => setVariant("lines")}>
                lines
              </Button>
              <Button mx={1} onClick={() => setVariant("cross")}>
                cross
              </Button>
            </Panel>
            <Panel position="top-right">
              <Box>Hide Edges</Box>
              <Checkbox
                id="ishidden"
                checked={hidden}
                onChange={(event) => setHidden(event.target.checked)}
                className="react-flow__ishidden"
              >
                Hide
              </Checkbox>
            </Panel>
            <Controls />
            <MiniMap
              nodeColor={nodeColor}
              nodeStrokeWidth={3}
              zoomable
              pannable
            />
          </ReactFlow>
        </Box>
      </VStack>
    </Stack>
  );
}

export default Flow;
