import type { RequestWrap, CardRequestData } from 'lib/types/utils/api';
import type { InnerForm } from 'lib/types/form/form';
import type { PageHeader } from './shared';

export interface CardConfig<ENTITY extends {}> {
  /** Top header of a page. Consists of the page title and tabs */
  header: PageHeader,

  /** CRUD requests for working with entity data */
  getRequest: RequestWrap<any, CardRequestData<ENTITY>>,
  createRequest: RequestWrap<any, CardRequestData<ENTITY>>,
  updateRequest: RequestWrap<any, CardRequestData<ENTITY>>,

  /** If no function is passed here, then no 'Remove' button will be displayed */
  deleteRequest?: RequestWrap<any, CardRequestData<ENTITY>>,

  /** If true, card page will always leave the form initially empty and won't skip required validations */
  alwaysCreate?: boolean,

  /** Whether to open the confirm dialog ("Are you sure you want to delete 'The entity'?")
   * when delete button is pressed */
  confirmDelete?: boolean,

  form: InnerForm<ENTITY, 'submit' | 'remove' | 'clear' | 'cancel'>,
}
