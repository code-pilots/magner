import type { GenericComponent } from 'lib/types/form';
import type { ValidatorFunc, SupportedValidators, ValidationField } from 'lib/types/configs/development';
import globalValues from 'lib/global';

type SetupValidatorFunc = (
  layout: GenericComponent<any>,
  skipValidation: boolean | SupportedValidators[],
  form: Record<string, any>
) => ValidationField[] | null;

/**
 * The function takes a field configuration and produces validation rules for it.
 * To do so, it takes the validation type setting and maps it to the configured validators.
 *
 * This `rules`, therefore, is used inside
 * the [Element-UI's form component](https://element-plus.org/en-US/component/form.html#validation)
 * along with the [`async-validator`](https://github.com/yiminghe/async-validator)
 */
const setupValidators: SetupValidatorFunc = (field, skipValidation, form) => {
  if (!field.validation || !skipValidation || skipValidation === true) return null;

  // Make validation to be an array and filter it from skipped validation types
  const validations = (Array.isArray(field.validation) ? field.validation : [field.validation])
    .filter((validation) => !skipValidation.includes(validation.type));

  if (!validations.length) {
    return null;
  }

  return validations.map((validation) => ({
    type: field.dataType || 'string',
    trigger: validation.trigger,
    validator: ((rule, value, callback) => globalValues.development.validation[validation.type]({
      rule,
      value,
      form,
    }, callback)) as ValidatorFunc,
  }));
};

export default setupValidators;
