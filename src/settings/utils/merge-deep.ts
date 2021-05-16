const isObject = (item: any): item is any => (item && typeof item === 'object' && !Array.isArray(item));

/**
 * MergeDeep function with credit to the first StackOverflow link
 */
export const mergeDeep = (target: any, ...sources: any): any => {
  if (!sources.length) return target;
  const source = sources.shift() || {};

  if (isObject(target) && source && isObject(source)) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(source)) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
};
