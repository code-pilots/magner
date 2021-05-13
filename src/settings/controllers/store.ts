import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { LS_TOKEN_KEY } from 'app/utils/constants';

interface State {
  token: string|null,
  user: boolean,
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
      token: (localStorage?.getItem(LS_TOKEN_KEY) as string|undefined) || null,
      user: false,
    };
  },

  mutations: {
    setToken (state, value: string) {
      state.token = value;
      if (value) {
        localStorage.setItem(LS_TOKEN_KEY, value);
      } else {
        localStorage.removeItem(LS_TOKEN_KEY);
      }
    },

    setUser (state, value: boolean) {
      state.user = value;
    },
  },

  actions: {
    changeToken (context, value: string) {
      context.commit('setToken', value);
    },
    changeUser (context, value: boolean) {
      context.commit('setUser', value);
    },
  },
});

const useStore = () => baseUseStore(injectionKey);
export default useStore;
