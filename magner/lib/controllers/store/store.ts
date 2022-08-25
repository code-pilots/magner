import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import type { ModalConfig } from 'lib/types/utils/modals';
import globalValues, { GlobalValues } from 'lib/global';

interface ModalData {
  handleSuccess: (data: unknown) => void,
  handleFail: (data: unknown) => void,
  config: ModalConfig<any>,
}

interface State {
  project: GlobalValues,

  language: string,
  user: unknown | null,
  role: string | null,

  /**
   * used only for mobile screens. If true - sidebar opened
   */
  sidebarOpened: boolean,
  sidebarCollapsed: boolean,
  /**
   * used only for mobile screens. True if filters are hidden
   */
  filtersCollapsed: boolean,
  /**
   * if true - "collapse filters" button is shown in header
   */
  hasFilters: boolean;

  modalData: ModalData | null,
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
   * Store state. Has persistent data about user-chosen language,
   * currency and additional information that could be shared between components.
   */
  state () {
    return {
      project: {} as GlobalValues,

      language: '',
      user: null,
      role: null,

      sidebarOpened: false,
      sidebarCollapsed: (typeof window !== 'undefined'
        && globalValues.lstorage.read('sidebarCollapsed') as boolean) || false,

      filtersCollapsed: true,
      hasFilters: false,

      modalData: null,
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

    setUser (state, value: unknown) {
      state.user = value;
    },

    setRole (state, value: string | null) {
      state.role = value;
    },

    setSidebarOpened (state, value: boolean) {
      state.sidebarOpened = value;
    },

    setSidebarCollapsed (state, value: boolean) {
      state.sidebarCollapsed = value;
      if (value) {
        globalValues.lstorage.put('sidebarCollapsed', value);
      } else {
        globalValues.lstorage.delete('sidebarCollapsed');
      }
    },

    setFiltersCollapsed (state, value: boolean) {
      state.filtersCollapsed = value;
    },

    setHasFilters (state, value: boolean) {
      state.hasFilters = value;
    },

    setModalComponent (state, value: ModalData | null) {
      state.modalData = value;
    },
  },

  actions: {
    changeProject (context, value: GlobalValues) {
      context.commit('setProject', value);
    },

    changeLanguage (context, value: string) {
      context.commit('setLanguage', value);
    },

    changeUser (context, value: unknown) {
      context.commit('setUser', value);
    },
    changeRole (context, value: string | null) {
      context.commit('setRole', value);
    },
    logout (context) {
      context.commit('setUser', null);
      context.commit('setRole', null);
    },

    toggleSidebarOpened (context, value: boolean) {
      context.commit('setSidebarOpened', !context.state.sidebarOpened);
    },

    toggleSidebarCollapsed (context) {
      context.commit('setSidebarCollapsed', !context.state.sidebarCollapsed);
    },

    toggleFiltersCollapsed (context) {
      context.commit('setFiltersCollapsed', !context.state.filtersCollapsed);
    },

    changeIsMobileScreen (context, value: boolean) {
      context.commit('setFiltersCollapsed', value);
    },

    changeHasFilters (context, value: boolean) {
      context.commit('setHasFilters', value);
    },

    changeModalComponent (context, value: ModalData | null) {
      context.commit('setModalComponent', value);
    },
  },
});

export type StoreType = ReturnType<typeof store>;

const useStore = () => baseUseStore(injectionKey);
export default useStore;
