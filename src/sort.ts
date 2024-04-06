const sort = (value: unknown) => {
  if (typeof value !== 'string') {
    throw new Error('INVALID_ARGUMENT');
  }

  const lower = value.toLowerCase();

  return lower
    .split(' ')
    .map((el) => el.split('').sort().join(''))
    .sort((a, b) => {
      if (a.length > b.length) {
        return 1;
      }
      if (a.length < b.length) {
        return -1;
      }
      return 0;
    })
    .join(' ');
};

export default sort;
