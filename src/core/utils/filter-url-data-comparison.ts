/* eslint-disable no-prototype-builtins */

type FuncType = (arg_1: Record<string, any>, arg_2: Record<string, any>) => void;

/** Special function used only in filters that makes a deep object comparison and
 * applies properties from the 2nd argument to properties in 1st argument only if they exist there. */
const filterUrlDataComparison: FuncType = (initialFilters, urlData) => {
  if (!urlData) return;

  Object.entries(urlData).forEach(([key1, value1]) => {
    if (Object(initialFilters).hasOwnProperty(key1)) {
      if (typeof value1 === 'object') {
        filterUrlDataComparison(initialFilters[key1], urlData[key1]);
      } else {
        initialFilters[key1] = value1;
      }
    }
  });
};

export default filterUrlDataComparison;
