import type { RequestFunc } from 'core/types/utils';
import type { GenericForm } from 'core/types/form';

export interface CardConfig {
  title: string,
  request: RequestFunc,
  form: GenericForm,
}
