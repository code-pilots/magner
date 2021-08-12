import type { TranslateData } from 'core/utils/translate';
import type { FormLayout } from 'core/types/form/layout';
import type { ButtonComponent } from 'core/types/form/fields/button';

export interface DialogForm {
  name: string,
  open: boolean,
  title?: TranslateData,
  layout: FormLayout,
  submit: ButtonComponent|null,
  size?: 'medium'|'small'|'mini',
}
