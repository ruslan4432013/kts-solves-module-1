const isStringArray = (arr: unknown[]): arr is string[] => {
  return arr.every((el) => typeof el === 'string');
};

type AnagramsDict = Record<string, number>;

const removeAnagrams = (values: unknown) => {
  if (!Array.isArray(values)) {
    throw new Error('INVALID_ARGUMENT');
  }
  if (!isStringArray(values)) {
    throw new Error('INVALID_ELEMENT_IN_ARRAY');
  }
  const anagramsWords = new Set<string>();

  const anagrams = values.reduce((acc: AnagramsDict, el: string) => {
    const key = el.toLowerCase().split('').sort().join('');
    const repeats = (acc?.[key] || 0) + 1;
    acc[key] = repeats;
    return acc;
  }, {} as AnagramsDict);

  for (const value of values) {
    const key = value.toLowerCase().split('').sort().join('');
    if (anagrams[key] > 1) {
      anagramsWords.add(value);
    }
  }

  return values.filter((el) => !anagramsWords.has(el));
};

export default removeAnagrams;
