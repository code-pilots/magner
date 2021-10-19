import type { TranslateData } from 'lib/utils/core/translate';
import type { GenericForm } from 'lib/types/form';
import type { ProfileRequest } from 'lib/types/configs/development';

export interface LoginConfig {
  title: TranslateData,
  request: ProfileRequest,
  form: GenericForm,
}
