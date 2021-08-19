import type { SupportedValidators, Validators } from 'core/types/configs';
import { validators } from './base';

export type ValidationController = <CUSTOM_VALIDATION extends string>(custom: Validators<CUSTOM_VALIDATION>)
  => Validators<CUSTOM_VALIDATION | SupportedValidators>;

export const validationController: ValidationController = (custom) => ({
  ...validators,
  ...custom,
}) as Validators<string | SupportedValidators>;
