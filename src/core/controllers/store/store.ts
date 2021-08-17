import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import type { CustomRoute, GlobalRouting, ProjectConfig } from 'core/types/configs';
import type { SupportedLanguages } from 'configs/translation';
import { locale as elLocale } from 'element-plus';
import ROLE from 'configs/roles';
import lstorage from 'core/utils/local-storage';
import globalValues from 'core/global';

interface State {
  globalRoutes: GlobalRouting,
  allRoutes: CustomRoute[],

  project: ProjectConfig,

  language: SupportedLanguages,
  allLanguages: Record<SupportedLanguages, string>,

  token: string|null,
  user: any|null,
  role: ROLE|null,

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
      allRoutes: [],
      project: {} as ProjectConfig,

      language: '' as SupportedLanguages,
      allLanguages: {} as Record<SupportedLanguages, string>,

      token: lstorage.read('token') || null,
      user: null,
      role: null,

      sidebarCollapsed: lstorage.read('sidebarCollapsed') || false,
    };
  },

  mutations: {
    setGlobalRoutes (state, value: GlobalRouting) {
      state.globalRoutes = value;
    },
    setAllRoutes (state, value: CustomRoute[]) {
      state.allRoutes = value;
    },
    setProject (state, value: ProjectConfig) {
      state.project = value;
    },

    setLanguage (state, value: SupportedLanguages) {
      state.language = value;
      if (value) {
        lstorage.put('language', value);
      } else {
        lstorage.delete('language');
      }
    },
    setLanguages (state, value: Record<SupportedLanguages, string>) {
      state.allLanguages = value;
    },

    setToken (state, value: string) {
      state.token = value;
      if (value) {
        lstorage.put('token', value);
      } else {
        lstorage.delete('token');
      }
    },

    setUser (state, value: any) {
      state.user = value;
    },

    setRole (state, value: ROLE | null) {
      state.role = value;
    },

    setSidebar (state, value: boolean) {
      state.sidebarCollapsed = value;
      if (value) {
        lstorage.put('sidebarCollapsed', value);
      } else {
        lstorage.delete('sidebarCollapsed');
      }
    },
  },

  actions: {
    changeGlobalRoutes (context, value: GlobalRouting) {
      context.commit('setGlobalRoutes', value);
    },
    changeAllRoutes (context, value: CustomRoute[]) {
      context.commit('setAllRoutes', value);
    },
    changeProject (context, value: ProjectConfig) {
      context.commit('setProject', value);
    },

    changeLanguage (context, value: SupportedLanguages) {
      context.commit('setLanguage', value);
      if (globalValues.locales?.[value]) {
        elLocale(globalValues.locales[value]);
      }
    },
    changeAllLanguages (context, value: Record<SupportedLanguages, string>) {
      context.commit('setLanguages', value);
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

    toggleSidebar (context) {
      context.commit('setSidebar', !context.state.sidebarCollapsed);
    },
  },
});

export type StoreType = typeof store;

const useStore = () => baseUseStore(injectionKey);
export default useStore;
