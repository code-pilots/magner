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

export const useChecks = (field: GenericComponent<any>, value?: unknown) => {
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
  field: GenericComponent<any>,
  form: Record<string, any>,
  force?: Record<'readOnly' | 'disabled' | 'hidden', boolean | MixedChecker>,
) => {
  if (!field.props.inner) {
    field.props.inner = {};
  }

  // Save pure disabled function
  if (typeof field.props.inner.disabledCondition !== 'function') {
    field.props.inner.disabledCondition = field.props.disabled;
  }
  const disabled = force?.disabled ?? field.props.inner.disabledCondition;
  if (typeof disabled === 'function') {
    field.props.disabled = disabled.bind(null, {
      state: form,
      role: globalValues.store.state.role as string,
    });
  }

  // Save pure hidden function
  if (typeof field.props.inner.hiddenCondition !== 'function') {
    field.props.inner.hiddenCondition = field.props.hidden;
  }
  const hidden = force?.hidden ?? field.props.inner.hiddenCondition;
  if (typeof hidden === 'function') {
    field.props.hidden = hidden.bind(null, {
      state: form,
      role: globalValues.store.state.role as string,
    });
  }

  // Save pure readOnly function
  if (typeof field.props.inner.readOnlyCondition !== 'function') {
    field.props.inner.readOnlyCondition = field.props.readOnly;
  }

  const readOnly = force?.readOnly ?? field.props.inner.readOnlyCondition;
  if (typeof readOnly === 'function') {
    field.props.readOnly = readOnly.bind(null, {
      state: form,
      role: globalValues.store.state.role as string,
    });
  }

  if (field.type === 'collection') {
    const nestedFields = layoutToFields(field as unknown as GenericFormLayout<any>);
    nestedFields.forEach((nestedField) => updateFieldValues(nestedField, form, {
      readOnly: field.props.readOnly || false,
      disabled: field.props.disabled || false,
      hidden: field.props.hidden || false,
    }));
  }
};
