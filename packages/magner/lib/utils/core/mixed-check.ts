import { computed } from 'vue';
import type { GenericComponent } from 'lib/types/form/form';
import globalValues from 'lib/global';
import { layoutToFields } from 'lib/utils/form/form';
import { GenericFormLayout } from 'lib/types/form/layout';

export type MixedChecker = (data: {
  role: string,
  state: Record<string, unknown>,
}) => boolean;

type MixedCheckerOptional = (data?: {
  role: string,
  state: Record<string, unknown>,
}) => boolean;

export const mixedCheck = (checker: MixedChecker): MixedChecker => checker;

export const useChecks = (field: GenericComponent, value?: unknown) => {
  const disabled = computed(() => (typeof field.props.disabled === 'function'
    ? (field.props.disabled as MixedCheckerOptional)()
    : field.props.disabled || false));

  const hidden = computed(() => (typeof field.props.hidden === 'function'
    ? (field.props.hidden as MixedCheckerOptional)()
    : field.props.hidden || false));

  const readOnly = computed(() => (typeof field.props.readOnly === 'function'
    ? (field.props.readOnly as MixedCheckerOptional)()
    : field.props.readOnly || false));

  const readOnlyText = computed<string>(() => (
    (readOnly.value && field.props.readOnlyFormatter)
      ? field.props.readOnlyFormatter?.(value || null)
      : (value as string) || ''
  ));

  return {
    disabled,
    hidden,
    readOnly,
    readOnlyText,
  };
};

/**
 * `disabled`, `hidden`, `readOnly` accept `mixedChecks` function that returns a boolean depending on the
 * state of the form and the user role. Here, we bind those values to the function that will
 * be executed in the FormItem.
 */
export const updateFieldValues = (
  field: GenericComponent,
  form: Record<string, any>,
  force?: Record<'readOnly' | 'disabled' | 'hidden', boolean | MixedChecker>,
) => {
  const disabled = force?.disabled ?? field.props.disabled;
  field.props.disabled = disabled;
  if (typeof disabled === 'function') {
    field.props.disabled = disabled.bind(null, {
      state: form,
      role: globalValues.store.state.role as string,
    });
  }

  const hidden = force?.hidden ?? field.props.hidden;
  field.props.hidden = hidden;
  if (typeof hidden === 'function') {
    field.props.hidden = hidden.bind(null, {
      state: form,
      role: globalValues.store.state.role as string,
    });
  }

  const readOnly = force?.readOnly ?? field.props.readOnly;
  field.props.readOnly = readOnly;
  if (typeof readOnly === 'function') {
    field.props.readOnly = readOnly.bind(null, {
      state: form,
      role: globalValues.store.state.role as string,
    });
  }

  if (field.type === 'collection') {
    const nestedFields = layoutToFields(field as unknown as GenericFormLayout);
    nestedFields.forEach((nestedField) => updateFieldValues(nestedField, form, {
      readOnly: field.props.readOnly || false,
      disabled: field.props.disabled || false,
      hidden: field.props.hidden || false,
    }));
  }
};