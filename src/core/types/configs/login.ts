import type { GenericComponent } from 'core/types/components';
import type { ButtonComponent } from 'core/types/components/button';
import type { RequestFunc } from 'core/types/utils';

export interface LoginConfig {
  title: string,
  fields: GenericComponent[],
  submit: ButtonComponent,
  request: RequestFunc,
}
