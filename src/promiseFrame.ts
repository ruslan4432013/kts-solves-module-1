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
  if (!Array.isArray(functions) || (typeof limit === 'number' && limit <= 0)) {
    throw new Error('INVALID_ARGUMENT');
  }

  if (typeof limit !== 'undefined' && typeof limit !== 'number') {
    throw new Error('INVALID_ARGUMENT');
  }

  return new Promise((resolve, reject) => {
    let resolvedTasks = 0;
    const stack = functions.map((task, index) => ({ task, index }));
    const results: ResultsT[] = [];
    const executor = async (taskItem: { task: T[number]; index: number }) => {
      try {
        const { task, index } = taskItem;
        results[index] = await task();
        resolvedTasks++;

        if (resolvedTasks === functions.length) {
          resolve(results);
        }
        const taskForExecutor = stack.shift();
        if (taskForExecutor) {
          executor(taskForExecutor);
        }
      } catch (e) {
        reject(e);
      }
    };

    for (let i = 0; i < (limit || functions.length); i++) {
      const taskItem = stack.shift();
      if (taskItem) {
        executor(taskItem);
      }
    }
  });
};

export default promiseFrame;
