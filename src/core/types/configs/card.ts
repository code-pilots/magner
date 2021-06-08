import type { RequestFunc } from 'core/types/utils';
import type { GenericComponent } from 'core/types/components';
import type { ButtonComponent } from 'core/types/components/button';

export interface CardConfig {
  title: string,
  request: RequestFunc,
  fields: GenericComponent[],
  submit: ButtonComponent,
}
