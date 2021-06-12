import type { GenericForm } from 'core/types/form';
import type { RequestCallback } from 'core/types/utils';

export interface LoginConfig {
  title: string,
  request: RequestCallback,
  form: GenericForm,
}
