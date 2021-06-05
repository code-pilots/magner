import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import ROLE from 'configs/roles';
import lstorage from 'settings/utils/local-storage';
import { GlobalRouting } from 'settings/types/configs';

interface State {
  globalRoutes: GlobalRouting,
  token: string|null,
  user: any|null,
  role: ROLE|null,
}

const LSKeys = {
  token: 'token',
};

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
      globalRoutes: {
        homeNoAuthName: '',
        homeHasAuthName: '',
      },

      token: lstorage.read(LSKeys.token) || null,
      user: null,
      role: null,
    };
  },

  mutations: {
    setGlobalRoutes (state, value: GlobalRouting) {
      state.globalRoutes = value;
    },

    setToken (state, value: string) {
      state.token = value;
      if (value) {
        lstorage.put(LSKeys.token, value);
      } else {
        lstorage.delete(LSKeys.token);
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
    changeGlobalRoutes (context, value: GlobalRouting) {
      context.commit('setGlobalRoutes', value);
    },
    changeToken (context, value: string) {
      context.commit('setToken', value);
    },
    changeUser (context, value: any) {
      context.commit('setUser', value);
    },
    changeRole (context, value: ROLE | null) {
      context.commit('setRole', value);
    },
    logout (context) {
      context.commit('setUser', null);
      context.commit('setRole', null);
      context.commit('setToken', null);
    },
  },
});

export type StoreType = typeof store;

const useStore = () => baseUseStore(injectionKey);
export default useStore;
