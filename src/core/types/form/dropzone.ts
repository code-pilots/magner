import { BaseComponent, BaseField } from 'core/types/form/base';

/** Dropzone component properties */
export interface DropzoneComponent extends BaseComponent {
  /** Accept several files at once or not */
  multiple?: boolean,
  maxAmount?: number,

  /** Maximal size of the file in Megabytes */
  maxSize?: number,

  /** Allowed formats for the input */
  formats?: string[],

  /** Disable drag-and-drop. Upload is still accessible by click */
  noDrop?: boolean,

  disabled?: boolean,

  inputAtts?: {
    id: string,
    name: string,
    accept: string,
    capture: string,
    autofocus: string,
  },
}

export interface DropzoneField extends BaseField {
  type: 'dropzone',
  component: DropzoneComponent,
}
