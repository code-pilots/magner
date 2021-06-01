import type { RequestFunc } from 'settings/types/utils';
import type { GenericComponent } from 'settings/types/components';
import type { ButtonComponent } from 'settings/types/components/button';

export interface CardConfig {
  title: string,
  request: RequestFunc,
  fields: GenericComponent[],
  submit: ButtonComponent,
}
