import type { RequestWrap } from 'lib/types/utils/api';
import type { BaseField, BaseProps } from '../base';

export type DropzoneUploadReturn = string | number | File | Record<string, any>;

export interface DropzoneError {
  type: 'FormatsError'|'MaxAmountError'|'MaxSizeError',
  /** Value of the exceeded property like file size, or extension, or ratio. */
  value: number | string,

  /** Value of the passed property that checks the error */
  allowed: number | string | string[] | Record<string, unknown>,

  /** Name of the file with an error. Applied to Formats and Size error */
  name?: string, // name of the file
}

export type DropzoneFileType = 'image' | 'video' | 'file';

export interface DropzoneFileView {
  type: DropzoneFileType,
  src?: string,
  caption?: string,
}

export interface DropzoneFile {
  value: string | number | File,
  file?: File | null,
  size?: number,
  loading?: boolean,
  view: Promise<DropzoneFileView>,
  key?: string | number,
  upload?: Promise<DropzoneFile | null>,
}

export type DropzoneValue = string | Record<string, unknown> | string[] | Record<string, unknown>[];

interface InputAtts {
  id: string,
  name: string,
  accept: string,
  capture: string,
  autofocus: string,
}

/** Dropzone component properties */
export interface DropzoneProps extends BaseProps {
  /**
   * Function that receives a file as data in the RequestCallback.
   * It must return error if upload didn't happen and a string or a file representing the value
   * of a dropzone file
   */
  saveToBackend?: RequestWrap<DropzoneUploadReturn, File>,

  /** When initial value is passed, define what field is an actual value. Default: 'value' */
  valueKey?: string,
  /** When initial value is passed, define what field can represent the link to the file. Default: 'src' */
  srcKey?: string,
  /** When initial value is passed, define what field can represent label of the file. Default: 'caption' */
  captionKey?: string,

  /**
   * Accept one or multiple files. Depending on this prop, the 'update:modelValue' event
   * sends an Object of a file or an Array of files
   */
  multiple?: boolean,
  maxAmount?: number,

  /** Maximal size of the file in Megabytes */
  maxSize?: number,

  /** Allowed formats for the input */
  formats?: string[]|null,

  /** Disable dropzone's drag-and-drop. Upload is still accessible by click */
  noDrop?: boolean,

  /** Sort images or files inside the dropzone with Drag-and-Drop. Default is true */
  sortable?: boolean,

  /** Display "X" button over uploaded images */
  removable?: boolean,

  inputAtts?: Partial<InputAtts>,
}

export interface DropzoneField<ENTITY extends {}> extends BaseField<ENTITY> {
  type: 'dropzone',
  props: DropzoneProps,
}
