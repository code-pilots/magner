import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import globalValues, { GlobalValues } from 'core/global';

interface State {
  project: GlobalValues,

  language: string,
  token: string|null,
  user: any|null,
  role: string|null,

  sidebarCollapsed: boolean,
}

/**
 * A key that is needed to access the store in a form of useStore() hook in the
 * setup() function of every component.
 */
export type InjectionKeyType = InjectionKey<Store<State>>;
// eslint-disable-next-line symbol-description
export const injectionKey: InjectionKeyType = Symbol();

/**
 * Global store with the state that is commonly used throughout many
 * components in the project.
 */
export const store = () => createStore<State>({
  /**
   * Store state. Has persistent data about user-chosen language, token,
   * currency and additional information that could be shared between components.
   */
  state () {
    return {
      project: {} as GlobalValues,

      language: '',
      token: (typeof window !== 'undefined' && globalValues.lstorage.read('token')) || null,
      user: null,
      role: null,

      sidebarCollapsed: (typeof window !== 'undefined' && globalValues.lstorage.read('sidebarCollapsed')) || false,
    };
  },

  mutations: {
    setProject (state, value: GlobalValues) {
      state.project = value;
    },

    setLanguage (state, value: string) {
      state.language = value;
      if (value) {
        globalValues.lstorage.put('language', value);
      } else {
        globalValues.lstorage.delete('language');
      }
    },

    setToken (state, value: string) {
      state.token = value;
      if (value) {
        globalValues.lstorage.put('token', value);
      } else {
        globalValues.lstorage.delete('token');
      }
    },

    setUser (state, value: any) {
      state.user = value;
    },

    setRole (state, value: string | null) {
      state.role = value;
    },

    setSidebar (state, value: boolean) {
      state.sidebarCollapsed = value;
      if (value) {
        globalValues.lstorage.put('sidebarCollapsed', value);
      } else {
        globalValues.lstorage.delete('sidebarCollapsed');
      }
    },
  },

  actions: {
    changeProject (context, value: GlobalValues) {
      context.commit('setProject', value);
    },

    changeLanguage (context, value: string) {
      context.commit('setLanguage', value);
    },

    changeToken (context, value: string) {
      context.commit('setToken', value);
    },
    changeUser (context, value: any) {
      context.commit('setUser', value);
    },
    changeRole (context, value: string | null) {
      context.commit('setRole', value);
    },
    logout (context) {
      context.commit('setUser', null);
      context.commit('setRole', null);
      context.commit('setToken', null);
    },

    toggleSidebar (context) {
      context.commit('setSidebar', !context.state.sidebarCollapsed);
    },
  },
});

export type StoreType = ReturnType<typeof store>;

const useStore = () => baseUseStore(injectionKey);
export default useStore;
