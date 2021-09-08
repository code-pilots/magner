import type { GenericComponent } from '../../types/form';
import type { SupportedValidators, ValidationField } from '../../types/configs';
import { layoutToFields } from './form';
import globalValues from '../../global';

type SetupFunc = (
  fields: GenericComponent[],
  skipValidation: boolean | SupportedValidators[],
  form: Record<string, any>
) => Record<string, ValidationField[]>;

/**
 * The function goes through all the form fields and collects the 'validation' property, transforms it
 * to the function from the existing validation types and passed to the Form component as a 'rules' prop.
 */
const setupValidators: SetupFunc = (layout, skipValidation, form) => {
  const fields = layoutToFields(layout);

  return fields.reduce((accum, field) => {
    if (!field.validation || !skipValidation || skipValidation === true) return accum;

    // Make validation to be an array and filter it from skipped validation types
    const validations = (Array.isArray(field.validation) ? field.validation : [field.validation])
      .filter((validation) => !skipValidation.includes(validation.type));

    if (!validations.length) {
      return accum;
    }

    accum[field.name] = validations.map((validation) => ({
      type: field.dataType || 'string',
      trigger: validation.trigger,
      validator: (rule, value, callback) => globalValues.development.validation[validation.type]({
        rule,
        value,
        form,
      }, callback),
    }));

    return accum;
  }, {} as Record<string, ValidationField[]>);
};

export default setupValidators;
