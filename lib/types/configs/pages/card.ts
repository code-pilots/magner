import type { RequestCallback } from 'lib/types/utils/api';
import type { GenericForm } from 'lib/types/form';
import type { PageHeader } from './shared';

export interface CardConfig {
  /** Top header of a page. Consists of the page title and tabs */
  header: PageHeader,

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
