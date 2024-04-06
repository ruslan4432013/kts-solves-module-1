const memo = <T extends (...args: any[]) => any>(
  func: T,
  time?: number
): ((...arg: Parameters<T>) => ReturnType<T>) => {
  if (typeof func !== 'function') {
    throw new Error('INVALID_ARGUMENT');
  }

  if (typeof time !== 'undefined' && (typeof time !== 'number' || time <= 0)) {
    throw new Error('INVALID_ARGUMENT');
  }

  const cache: Record<string, ReturnType<T>> = {};

  const inner = (...args: Parameters<T>): ReturnType<T> => {
    const key = args.length > 0 ? JSON.stringify(args) : 'noop';
    if (!cache[key]) {
      cache[key] = func(...args);
    }

    if (typeof time === 'number' && time > 0) {
      setTimeout(() => {
        delete cache[key];
      }, time + 100);
    }

    return cache[key];
  };

  return inner;
};

export default memo;
