import type { GenericForm } from 'core/types/form';
import type { RequestFunc } from 'core/types/utils';

export interface LoginConfig {
  title: string,
  request: RequestFunc|Function,
  form: GenericForm,
}
