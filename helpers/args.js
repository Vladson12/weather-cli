const getArgs = (args) => {
  const res = {};
  const [command, file, ...rest] = args;
  rest.forEach((value, index, array) => {
    if (value.startsWith('-')) {
      if (index === array.length - 1 || array[index + 1].startsWith('-')) {
        res[value.slice(1)] = true;
      } else if (!array[index + 1].startsWith('-')) {
        res[value.slice(1)] = array[index + 1];
      }
    }
  });
  return res;
};

export { getArgs };
