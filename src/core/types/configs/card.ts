import type { RequestCallback } from 'core/types/utils';
import type { GenericForm } from 'core/types/form';

export interface CardConfig {
  title: string,

  /** CRUD requests for working with entity data */
  getRequest: RequestCallback,
  createRequest: RequestCallback,
  updateRequest: RequestCallback,
  deleteRequest: RequestCallback,

  /** Whether to open the confirm dialog ("Are you sure you want to delete 'The entity'?")
   * when delete button is pressed */
  confirmDelete?: boolean,

  form: GenericForm,
}
