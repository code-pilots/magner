import type { GenericForm } from 'core/types/form';
import type { RequestCallback } from 'core/types/utils';
import type { TranslateData } from 'core/utils/core/translate';

export interface LoginConfig {
  title: TranslateData,
  request: RequestCallback,
  form: GenericForm,
}
