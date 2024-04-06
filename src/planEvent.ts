const planEvent = (cb: unknown, timeout: unknown) => {
  if (typeof cb !== 'function') {
    throw new Error('INVALID_ARGUMENT');
  }
  if (typeof timeout !== 'number') {
    throw new Error('INVALID_ARGUMENT');
  }
  if (timeout <= 0) {
    return Promise.resolve(cb());
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cb());
    }, timeout);
  });
};

export default planEvent;
