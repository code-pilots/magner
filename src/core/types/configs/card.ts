import type { RequestFunc } from '../../types/utils';
import type { GenericComponent } from '../../types/components';
import type { ButtonComponent } from '../../types/components/button';

export interface CardConfig {
  title: string,
  request: RequestFunc,
  fields: GenericComponent[],
  submit: ButtonComponent,
}
