import type { TranslateData } from 'core/utils/translate';
import type { FormLayout } from 'core/types/form/layout';
import type { ButtonComponent } from 'core/types/form/fields/button';
import type { FormInteractionsData } from 'core/types/form/base';

export type DialogFormInteractions = (data: Record<string, any>, formData: FormInteractionsData) => void

export interface DialogForm {
  name: string,
  open: boolean,
  title?: TranslateData,
  layout: FormLayout,
  submit: ButtonComponent|null,
  submitAction?: DialogFormInteractions,
  size?: 'medium'|'small'|'mini',
}
