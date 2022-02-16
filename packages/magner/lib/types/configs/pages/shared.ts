import type { TranslateData } from 'lib/utils/core/translate';
import type { RouteLocationRaw, RouteLocation } from 'vue-router';

export interface PageHeaderTab {
  label: TranslateData,

  /** Leave only one tab active for the better UX */
  active?: boolean,

  /** In the tab, you can specify a function which takes a current route
   * as an argument and returns the vue-router acceptable link */
  link: ((route: RouteLocation) => RouteLocationRaw) | RouteLocationRaw,
}

export interface PageHeader {
  /** Page title */
  title?: TranslateData,

  /** Tabs are the links to other pages represented in the form of tabs */
  tabs?: PageHeaderTab[],
}
