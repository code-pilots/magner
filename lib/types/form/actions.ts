import type { TranslateData } from 'lib/utils/core/translate';
import type { ButtonProps } from './fields/button';

export interface FormAction extends Omit<ButtonProps, 'text'> {
  action: 'submit' | 'cancel' | 'remove' | 'clear',
  loading?: boolean,
  text?: TranslateData,
}
