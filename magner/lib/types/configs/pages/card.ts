import type { RequestWrap, CardRequestData } from 'lib/types/utils/api';
import type { InnerForm } from 'lib/types/form/form';
import { TranslateData } from 'lib/utils/core/translate';
import type { PageHeader } from './shared';

export interface CardConfig<ENTITY extends {}> {
  /** Top header of a page. Consists of the page title and tabs */
  header: PageHeader<string, ENTITY>,

  /** CRUD requests for working with entity data */
  getRequest: RequestWrap<any, CardRequestData<ENTITY>>,
  getNewRequest?: RequestWrap<any, CardRequestData<ENTITY>>,
  getLayoutRequest?: RequestWrap<any, CardRequestData<ENTITY>>,
  createRequest: RequestWrap<any, CardRequestData<ENTITY>>,
  updateRequest: RequestWrap<any, CardRequestData<ENTITY>>,

  /** If no function is passed here, then no 'Remove' button will be displayed */
  deleteRequest?: RequestWrap<any, CardRequestData<ENTITY>>,

  successMessage?: Partial<{
    create: string,
    update: string,
    delete: string,
  }>

  /** If true, card page will always leave the form initially empty and won't skip required validations */
  alwaysCreate?: boolean,

  /** Whether to open the confirm dialog ("Are you sure you want to delete 'The entity'?"),
   * when delete button is pressed.
   *
   * If a `string` or `translate()` function is passed, this information will be written in confirm modal window.
   * */
  confirmDelete?: boolean | TranslateData,

  form: InnerForm<ENTITY, 'submit' | 'remove' | 'clear' | 'cancel'>,
}
