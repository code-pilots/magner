import type { RouteLocationRaw } from 'vue-router';
import type { RequestCallback } from '../../utils/api';
import type { GenericForm } from '../../form';
import type { TranslateData } from '../../../utils/core/translate';

export interface CardTab {
  active?: boolean,
  label: TranslateData,

  /** In the tab, you can specify a function which takes a backend response from the page's 'getRequest'
   * and returns the vue-router acceptable link */
  link: ((response: unknown) => RouteLocationRaw) | RouteLocationRaw,
}

export interface CardConfig {
  title: TranslateData,

  tabs?: CardTab[],

  /** CRUD requests for working with entity data */
  getRequest: RequestCallback,
  createRequest: RequestCallback,
  updateRequest: RequestCallback,
  deleteRequest?: RequestCallback, // If no function is passed here, then no 'Remove' button will be displayed

  /** If true, card page will always leave the form initially empty and won't skipp required validations */
  alwaysCreate?: boolean,

  /** Whether to open the confirm dialog ("Are you sure you want to delete 'The entity'?")
   * when delete button is pressed */
  confirmDelete?: boolean,

  form: GenericForm,
}
