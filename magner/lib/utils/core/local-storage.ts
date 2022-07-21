type SupportedLSKeys = 'token'|'sidebarCollapsed'|'filters'|'language';

const lstorageController = (key: string) => {
  /**
   * Manipulate with the stringified object placed in the LocalStorage for
   * persisting the data from the admin panel
   */
  const getLsObject = (): Record<string, any> => {
    const ls = localStorage.getItem(key);
    if (ls) {
      try {
        return JSON.parse(ls);
      } catch (_) {
        return {};
      }
    } else {
      localStorage.setItem(key, JSON.stringify({}));
      return {};
    }
  };

  return {
    read: (field: SupportedLSKeys): unknown => getLsObject()[field],

    put: (field: SupportedLSKeys, value: unknown) => {
      const ls = getLsObject();
      ls[field] = value;
      localStorage.setItem(key, JSON.stringify(ls));
    },

    delete: (field: SupportedLSKeys) => {
      const ls = getLsObject();
      delete ls[field];
      localStorage.setItem(key, JSON.stringify(ls));
    },

    deepRead: (field: SupportedLSKeys, nestedField: string): unknown => getLsObject()[field]?.[nestedField],

    deepPut: (field: SupportedLSKeys, nestedField: string, value: unknown) => {
      const ls = getLsObject();
      if (ls[field]) ls[field] = { ...ls[field], [nestedField]: value };
      else ls[field] = { [nestedField]: value };
      localStorage.setItem(key, JSON.stringify(ls));
    },
  };
};

export type LStorage = ReturnType<typeof lstorageController>;

export default lstorageController;
