import type { GenericComponent } from 'core/types/form';
import type { SupportedValidators, ValidationField } from 'core/types/configs';
import { layoutToFields } from 'core/utils/form/form';
import globalValues from 'core/global';

type SetupFunc = (
  fields: GenericComponent[],
  skipValidation: boolean | SupportedValidators[],
  form: Record<string, any>
) => Record<string, ValidationField>;

/**
 * The function goes through all the form fields and collects the 'validation' property, transforms it
 * to the function from the existing validation types and passed to the Form component as a 'rules' prop.
 */
const setupValidators: SetupFunc = (layout, skipValidation, form) => {
  const fields = layoutToFields(layout);

  return fields.reduce((accum, field) => {
    if (!field.validation
      || skipValidation === true
      || (Array.isArray(skipValidation) && skipValidation.includes(field.validation.type))
    ) {
      return accum;
    }

    accum[field.name] = {
      type: field.dataType || 'string',
      validator: (rule, value, callback) => globalValues.development.validation[field.validation!.type]({
        rule,
        value,
        form,
      }, callback),
      trigger: field.validation.trigger,
    };

    return accum;
  }, {} as Record<string, ValidationField>);
};

export default setupValidators;
