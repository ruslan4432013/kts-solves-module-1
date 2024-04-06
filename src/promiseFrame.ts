type FunctionType<T> = () => Promise<T> | T;

// Получить из массива функций перечисление результатов их вызовов
// (в случае возврата промиса учитывается именно результат промиса)
type FunctionResultsUnion<
  T extends FunctionType<any>[] | Readonly<FunctionType<any>[]>
> = {
  [K in keyof T]: Awaited<ReturnType<T[K]>>;
}[number];

const promiseFrame = async <
  T extends FunctionType<any>[] | Readonly<FunctionType<any>[]>,
  ResultsT = FunctionResultsUnion<T>
>(
  functions: T,
  limit?: number
): Promise<ResultsT[]> => {
  if (!Array.isArray(functions)) {
    throw new Error('INVALID_ARGUMENT');
  }
  if (typeof limit === 'undefined') {
    return Promise.all(functions.map((fn) => fn()));
  }

  if (typeof limit !== 'number' || limit <= 0) {
    throw new Error('INVALID_ARGUMENT');
  }
  const meta: Record<string, any> = {};
  let taskIndex = 0;
  let running = 0;

  await new Promise((resolve, reject) => {
    const inner = () => {
      if (functions.length === taskIndex && running === 0) {
        resolve(true);
      }
      while (running < limit && functions.length !== taskIndex) {
        const currentIndex = taskIndex;
        const task = functions[currentIndex];
        if (running < limit) {
          const res = task();
          if (!(res instanceof Promise)) {
            meta[currentIndex] = res;
          } else {
            running += 1;
            res
              .then((result) => {
                running--;
                meta[currentIndex] = result;
                inner();
              })
              .catch((err) => reject(err));
          }
          taskIndex += 1;
          if (functions.length === taskIndex && running === 0) {
            resolve(true);
          }
        }
      }
    };
    inner();
  });

  return Object.values(meta);
};

export default promiseFrame;
