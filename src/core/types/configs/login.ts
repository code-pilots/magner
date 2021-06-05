import type { GenericComponent } from '../../types/components';
import type { ButtonComponent } from '../../types/components/button';
import type { RequestFunc } from '../../types/utils';

export interface LoginConfig {
  title: string,
  fields: GenericComponent[],
  submit: ButtonComponent,
  request: RequestFunc,
}
