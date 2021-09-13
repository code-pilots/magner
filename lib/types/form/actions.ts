import type { ButtonProps } from './fields/button';
import type { TranslateData } from '../../utils/core/translate';

export interface FormAction extends Omit<ButtonProps, 'text'> {
  action: 'submit' | 'cancel' | 'remove' | 'clear',
  loading?: boolean,
  text?: TranslateData,
}
