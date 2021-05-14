export type SupportedComponentTypes = 'input'|'textarea';

export interface BaseComponent {
  name: string,
  backendName?: string,
}

export interface BaseField {
  type: SupportedComponentTypes,
  component: any,
}
