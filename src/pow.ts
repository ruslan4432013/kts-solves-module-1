const pow = (base: unknown, exponent?: unknown) => {
  if (typeof base !== 'number') {
    throw new Error('INVALID_ARGUMENT');
  }

  if (typeof exponent === 'undefined') {
    return (value: unknown) => {
      if (typeof value !== 'number') {
        throw new Error('INVALID_ARGUMENT');
      }
      return Math.pow(base, value);
    };
  }
  if (typeof exponent === 'number') {
    return Math.pow(base, exponent);
  }
  throw new Error('INVALID_ARGUMENT');
};

export default pow;
