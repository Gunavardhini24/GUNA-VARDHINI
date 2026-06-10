export const submitPipeline = async (nodes, edges) => {
  const payload = {
    nodes: nodes.map((node) => ({
      id: node.id,
      type: node.type,
    })),

    edges: edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
    })),
  };

  const response = await fetch(
    'http://localhost:8000/pipelines/parse',
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to analyze pipeline');
  }

  return response.json();
};