import type { GenericForm } from 'core/types/form';
import type { RequestCallback } from 'core/types/utils';
import { TranslateData } from 'core/utils/translate';

export interface LoginConfig {
  title: TranslateData,
  request: RequestCallback,
  form: GenericForm,
}
