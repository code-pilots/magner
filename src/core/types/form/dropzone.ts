import { BaseComponent, BaseField } from 'core/types/form/base';

export interface DropzoneComponent extends BaseComponent {

}

export interface DropzoneField extends BaseField {
  type: 'dropzone',
  component: DropzoneComponent,
}
