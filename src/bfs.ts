const isPlainObject = (value: unknown): value is Record<string, string[]> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    value.toString() === '[object Object]'
  );
};

const bfs = (graph: unknown) => {
  if (!isPlainObject(graph)) {
    throw new Error('INVALID_ARGUMENT');
  }
  const stack: string[] = [];
  let curr = 'A';
  const res: string[] = [];
  stack.push(curr);
  const visited = new Set<string>();
  while (stack.length > 0) {
    if (!visited.has(curr)) {
      res.push(curr);
      visited.add(curr);
    }
    for (const vertex of graph[curr]) {
      stack.push(vertex);
    }
    curr = stack.shift()!;
  }
  return res;
};

export default bfs;
