import type { TranslateData } from 'lib/utils/core/translate';
import type { RouteLocationRaw, RouteLocation } from 'vue-router';
import type { ActionButton } from 'lib/types/utils/actions';

export interface PageHeaderTab {
  label: TranslateData,

  /** Leave only one tab active for the better UX */
  active?: boolean,

  /** In the tab, you can specify a function which takes a current route
   * as an argument and returns the vue-router acceptable link */
  link: ((route: RouteLocation) => RouteLocationRaw) | RouteLocationRaw,

  /** Hide the tab if it is used in the empty (New) entity card */
  hideIfNew?: boolean,
}

export interface PageHeader<EMITTERS = string> {
  /** Page title */
  title?: TranslateData,

  /** Tabs are the links to other pages represented in the form of tabs */
  tabs?: PageHeaderTab[],

  /** Actions are buttons placed in page header */
  actions?: ActionButton<EMITTERS>[],
}
