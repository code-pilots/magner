import { GenericComponent } from 'settings/types/components';

export interface AuthConfig {
  login: {
    title: string,
    fields: GenericComponent[],
  }
}
