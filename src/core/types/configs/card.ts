import type { RequestCallback } from 'core/types/utils';
import type { GenericForm } from 'core/types/form';

export interface CardConfig {
  title: string,
  getRequest: RequestCallback,
  createRequest: RequestCallback,
  form: GenericForm,
}
