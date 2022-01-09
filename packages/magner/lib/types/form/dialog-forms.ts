import type { TranslateData } from 'lib/utils/core/translate';
import type { FormLayout } from './layout';
import type { ButtonProps } from './fields/button';
import type { FormInteractionsData } from './base';

export type DialogFormInteractions<ENTITY extends {}> = (
  data: Record<string, any>,
  formData: FormInteractionsData<ENTITY>,
) => void

/** Dialog form is a hidden form that you can call inside the main form (only in 'card' pages) */
export interface DialogForm<ENTITY extends {}> {
  /** Unique name of the form */
  name: string,

  /** Is the form initially open */
  open: boolean,

  /** Show dialog on mobile screens. Uses drawer from bottom by default */
  dialogOnMobile?: boolean,

  /** Title of the dialog (or drawer in case of mobile) */
  title?: TranslateData,

  /** Form layout */
  layout: FormLayout<ENTITY>,

  /** Form submit button */
  submit?: ButtonProps,

  /** Call this action on form submit. Has 'data' property as an argument with the field-value object */
  submitAction?: DialogFormInteractions<ENTITY>,

  size?: 'medium'|'small'|'mini',
}
