import projectConfig from 'configs/project';

/**
 * Manipulate with the stringified object placed in the LocalStorage for
 * persisting the data from the admin panel
 */
const getLsObject = (): Record<string, any> => {
  const ls = localStorage.getItem(projectConfig.LOCAL_STORAGE_KEY);
  if (ls) {
    try {
      return JSON.parse(ls);
    } catch (_) {
      return {};
    }
  } else {
    localStorage.setItem(projectConfig.LOCAL_STORAGE_KEY, JSON.stringify({}));
    return {};
  }
};

/** Simple functions for manipulating localStorage object */
const lstorage = {
  read: (field: string): any => getLsObject()[field],

  put: (field: string, value: any) => {
    const ls = getLsObject();
    ls[field] = value;
    localStorage.setItem(projectConfig.LOCAL_STORAGE_KEY, JSON.stringify(ls));
  },

  delete: (field: string) => {
    const ls = getLsObject();
    delete ls[field];
    localStorage.setItem(projectConfig.LOCAL_STORAGE_KEY, JSON.stringify(ls));
  },
};

export default lstorage;
