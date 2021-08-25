import type { GenericForm, TranslateData } from 'core/index';
import type { ProfileRequest } from 'core/types/configs';

export interface LoginConfig {
  title: TranslateData,
  request: ProfileRequest,
  form: GenericForm,
}
