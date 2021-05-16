import type { GenericComponent } from 'settings/types/components';
import type { ButtonComponent } from 'settings/types/components/button';

export interface LoginConfig {
  title: string,
  fields: GenericComponent[],
  submit: ButtonComponent,
}
