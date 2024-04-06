const multiply = (value: unknown) => {
  if (typeof value !== 'number') {
    throw new Error('INVALID_ARGUMENT');
  }
  return (second: unknown) => {
    if (typeof second !== 'number') {
      throw new Error('INVALID_ARGUMENT');
    }
    return second * value;
  };
};

export default multiply;
