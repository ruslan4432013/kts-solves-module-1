const isPlainObject = (value: unknown): value is Record<string, string[]> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    value.toString() === '[object Object]'
  );
};

const dfs = (graph: unknown) => {
  if (!isPlainObject(graph)) {
    throw new Error('INVALID_ARGUMENT');
  }

  const res: string[] = [];
  const curr = 'A';
  const inner = (value: string) => {
    for (const vertex of graph[value]) {
      res.push(vertex);
      inner(vertex);
    }
  };
  res.push(curr);
  inner(curr);

  return res;
};

export default dfs;
