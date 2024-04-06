const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    value.toString() === '[object Object]'
  );
};

const getNumberProps = (props: unknown) => {
  if (!isPlainObject(props)) {
    throw new Error('INVALID_ARGUMENT');
  }
  const objectStack: Record<string, unknown>[] = [props];
  const result: string[] = [];

  while (objectStack.length > 0) {
    const source = objectStack.pop()!;
    for (const [key, value] of Object.entries(source)) {
      if (typeof value === 'number') {
        result.push(key);
      }

      if (isPlainObject(value)) {
        objectStack.push(value);
      }
    }
  }
  result.sort();
  return result;
};

export default getNumberProps;
