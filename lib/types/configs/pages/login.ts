import type { GenericForm, TranslateData } from '../../../index';
import type { ProfileRequest } from '../index';

export interface LoginConfig {
  title: TranslateData,
  request: ProfileRequest,
  form: GenericForm,
}
