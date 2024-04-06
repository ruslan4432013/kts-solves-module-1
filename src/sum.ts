const isNumberArray = (arr: unknown[]): arr is number[] => {
  return arr.every((el) => typeof el === 'number');
};
const sum = (...args: unknown[]) => {
  if (args.length < 2) {
    throw new Error('INVALID_ARGUMENTS_COUNT');
  }
  if (!isNumberArray(args)) {
    throw new Error('INVALID_ARGUMENT');
  }
  return args.reduce((el, acc) => el + acc, 0);
};

export default sum;
