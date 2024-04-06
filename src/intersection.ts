type Validation = (arr: unknown[]) => asserts arr is number[];
const isNumberArray: Validation = (arr: unknown[]): asserts arr is number[] => {
  if (!arr.every((el) => typeof el === 'number')) {
    throw new Error('INVALID_ELEMENT_IN_ARRAY');
  }
};

const intersection = (...args: unknown[]) => {
  if (args.length !== 2) {
    throw new Error('INVALID_ARGUMENTS_COUNT');
  }
  const [first, second] = args;

  if (!Array.isArray(first) || !Array.isArray(second)) {
    throw new Error('INVALID_ARGUMENT');
  }

  isNumberArray(first);
  isNumberArray(second);

  const firstSet = new Set(first);
  const secondRes = second.filter((el) => firstSet.has(el));
  return Array.from(new Set(secondRes));
};

export default intersection;
