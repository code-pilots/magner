import type { TranslateData } from 'lib/utils/core/translate';
import type { GenericForm } from 'lib/types/form';
import type { ProfileRequestResponse } from 'lib/types/configs/development';
import type { RequestWrap } from 'lib/types';

export interface LoginConfig<ENTITY extends {}> {
  title: TranslateData,
  request: RequestWrap<ProfileRequestResponse>,
  logo?: string,
  form: GenericForm<ENTITY>,
}
