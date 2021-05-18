import type { GenericComponent } from 'settings/types/components';
import type { ButtonComponent } from 'settings/types/components/button';
import type { RequestFunc } from 'settings/types/utils';

export interface LoginConfig {
  title: string,
  fields: GenericComponent[],
  submit: ButtonComponent,
  request: RequestFunc,
}
