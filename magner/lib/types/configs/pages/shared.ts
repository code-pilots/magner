import type { TranslateData } from 'lib/utils/core/translate';
import type { RouteLocationRaw, RouteLocation } from 'vue-router';
import type { ActionButton } from 'lib/types/utils/actions';

type TagType = 'success' | 'warning' | 'danger' | 'info';
type TagSize = 'small' | 'default' | 'large';
type TagTheme = 'dark' | 'light' | 'plain';

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

export interface PageHeader<EMITTERS = string, ENTITY = {}> {
  /** New title */
  newTitle?: TranslateData,

  /** Card or Table title */
  title?: TranslateData,

  /** Tag title */
  tag?: {
    name: keyof ENTITY,
    props: Partial<{
      type: TagType,
      size: TagSize,
      effect: TagTheme,
      round: boolean,
    }>,
  }

  /** Tabs are the links to other pages represented in the form of tabs */
  tabs?: PageHeaderTab[],

  /** Actions are buttons placed in page header */
  actions?: ActionButton<EMITTERS, ENTITY>[],
}
