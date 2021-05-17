import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import projectConfig from 'configs/project';
import ROLE from 'configs/roles';

interface State {
  token: string|null,
  user: any|null,
  role: ROLE|null,
}

/**
 * A key that is needed to access the store in a form of useStore() hook in the
 * setup() function of every component.
 */
// eslint-disable-next-line symbol-description
export const injectionKey: InjectionKey<Store<State>> = Symbol();

/**
 * Global store with the state that is commonly used throughout many
 * components in the project.
 */
export const store = createStore<State>({
  /**
   * Store state. Has persistent data about user-chosen language, token,
   * currency and additional information that could be shared between components.
   */
  state () {
    return {
      token: (localStorage?.getItem(projectConfig.LOCAL_STORAGE_KEY) as string|undefined) || null,
      user: null,
      role: null,
    };
  },

  mutations: {
    setToken (state, value: string) {
      state.token = value;
      if (value) {
        localStorage.setItem(projectConfig.LOCAL_STORAGE_KEY, value);
      } else {
        localStorage.removeItem(projectConfig.LOCAL_STORAGE_KEY);
      }
    },

    setUser (state, value: any) {
      state.user = value;
    },

    setRole (state, value: ROLE | null) {
      state.role = value;
    },
  },

  actions: {
    changeToken (context, value: string) {
      context.commit('setToken', value);
    },
    changeUser (context, value: any) {
      context.commit('setUser', value);
    },
    changeRole (context, value: ROLE | null) {
      context.commit('setRole', value);
    },
  },
});

const useStore = () => baseUseStore(injectionKey);
export default useStore;
