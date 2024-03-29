import { computed, ComputedRef } from 'vue';
import type { GenericComponent } from 'lib/types/form/form';
import globalValues from 'lib/global';
import { layoutToFields } from 'lib/utils/form/form';
import { FormLayout, GenericFormLayout } from 'lib/types/form/layout';
import { ActionButton } from 'lib/types/utils/actions';

export type MixedChecker<ENTITY extends {}> = (data: {
  role: string,
  isNew: boolean,
  state: ENTITY,
}) => boolean;

type MixedCheckerOptional = (data?: {
  role: string,
  isNew: boolean,
  state: Record<string, unknown>,
} | unknown) => boolean;

export const useLayoutChecks = (layout: GenericFormLayout<any> | GenericFormLayout<any>[]): {
  hidden: ComputedRef<boolean>
} => {
  const hidden = computed(() => {
    if (Array.isArray(layout)) {
      return false;
    }

    return (typeof layout.props.hidden === 'function'
      ? (layout.props.hidden as MixedCheckerOptional)()
      : layout.props.hidden || false);
  });

  return {
    hidden,
  };
};

const updateLayoutValue = (
  layout: GenericFormLayout<any>,
  form: Record<string, any>,
  isNew?: boolean,
) => {
  if (!layout.props.inner) {
    layout.props.inner = {};
  }

  if (typeof layout.props.inner.hiddenCondition !== 'function'
    && typeof layout.props.hidden === 'function') {
    layout.props.inner.hiddenCondition = layout.props.hidden;
  }

  const hidden = layout.props.inner.hiddenCondition;

  if (typeof hidden === 'function') {
    layout.props.hidden = hidden.bind(null, {
      state: form,
      isNew: isNew || false,
      role: globalValues.store.state.role as string,
    });
  }
};

const recursiveUpdateLayout = (
  layout: GenericFormLayout<any>,
  form: Record<string, any>,
  isNew?: boolean,
): GenericFormLayout<any> => {
  updateLayoutValue(layout, form, isNew);

  if (layout.layout) {
    layout.layout.forEach((item) => {
      recursiveUpdateLayout(item, form, isNew);
    });
  }

  return layout;
};

export const getUpdatedLayoutsValue = (
  layout: FormLayout<any>,
  form: Record<string, any>,
  isNew?: boolean,
): FormLayout<any> => {
  let updatedLayout: FormLayout<any>;

  if (Array.isArray(layout)) {
    updatedLayout = layout;
  } else {
    updatedLayout = recursiveUpdateLayout(layout, form, isNew) as FormLayout<any>;
  }

  return updatedLayout;
};

export const useChecks = (field: GenericComponent<any>, value?: unknown) => {
  const disabled = computed(() => (typeof field.props.disabled === 'function'
    ? (field.props.disabled as MixedCheckerOptional)(field.parent)
    : field.props.disabled || false));

  const hidden = computed(() => (typeof field.props.hidden === 'function'
    ? (field.props.hidden as MixedCheckerOptional)(field.parent)
    : field.props.hidden || false));

  const readOnly = computed(() => (typeof field.props.readOnly === 'function'
    ? (field.props.readOnly as MixedCheckerOptional)(field.parent)
    : field.props.readOnly || false));

  const changed = computed(() => (typeof field.props.changed === 'function'
    ? (field.props.changed as MixedCheckerOptional)(field.parent)
    : field.props.changed || false));

  const hiddenCollectionAddButton = computed(() => (typeof field.props.hiddenCollectionAddButton === 'function'
    ? (field.props.hiddenCollectionAddButton as MixedCheckerOptional)(field.parent)
    : field.props.hiddenCollectionAddButton || false));

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
    hiddenCollectionAddButton,
    changed,
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
  isNew?: boolean,
  force?: Record<
    'readOnly' | 'disabled' | 'hidden' | 'hiddenCollectionAddButton' | 'changed',
    undefined | boolean | MixedChecker<any>
  >,
) => {
  if (!field.props.inner) {
    field.props.inner = {};
  }

  // Save pure disabled function
  if (typeof field.props.inner.disabledCondition !== 'function'
    && typeof field.props.disabled === 'function') {
    field.props.inner.disabledCondition = field.props.disabled;
  }
  const disabled = force?.disabled ?? field.props.inner.disabledCondition;
  if (typeof disabled === 'function') {
    field.props.disabled = disabled.bind(null, {
      state: form,
      isNew: isNew || false,
      role: globalValues.store.state.role as string,
    });
  }

  // Save pure hidden function
  if (typeof field.props.inner.hiddenCondition !== 'function'
    && typeof field.props.hidden === 'function') {
    field.props.inner.hiddenCondition = field.props.hidden;
  }
  const hidden = force?.hidden ?? field.props.inner.hiddenCondition;
  if (typeof hidden === 'function') {
    field.props.hidden = hidden.bind(null, {
      state: form,
      isNew: isNew || false,
      role: globalValues.store.state.role as string,
    });
  }

  // Save pure readOnly function
  if (typeof field.props.inner.readOnlyCondition !== 'function'
    && typeof field.props.readOnly === 'function') {
    field.props.inner.readOnlyCondition = field.props.readOnly;
  }
  const readOnly = force?.readOnly ?? field.props.inner.readOnlyCondition;
  if (typeof readOnly === 'function') {
    field.props.readOnly = readOnly.bind(null, {
      state: form,
      isNew: isNew || false,
      role: globalValues.store.state.role as string,
    });
  }

  // Save pure changed function
  if (typeof field.props.inner.changedCondition !== 'function'
    && typeof field.props.changed === 'function') {
    field.props.inner.changedCondition = field.props.changed;
  }
  const changed = force?.changed ?? field.props.inner.changedCondition;
  if (typeof changed === 'function') {
    field.props.changed = changed.bind(null, {
      state: form,
      isNew: isNew || false,
      role: globalValues.store.state.role as string,
    });
  }

  if (field.type === 'collection') {
    if (typeof field.props.inner.hiddenCollectionAddButtonCondition !== 'function'
      && typeof field.props.hiddenCollectionAddButton === 'function') {
      field.props.inner.hiddenCollectionAddButtonCondition = field.props.hiddenCollectionAddButton;
    }
    const hiddenCollectionAddButton = force?.hiddenCollectionAddButton ?? field.props.inner.hiddenCollectionAddButtonCondition;

    if (typeof hiddenCollectionAddButton === 'function') {
      field.props.hiddenCollectionAddButton = hiddenCollectionAddButton.bind(null, {
        state: form,
        isNew: isNew || false,
        role: globalValues.store.state.role as string,
      });
    }

    const nestedFields = layoutToFields(field as unknown as GenericFormLayout<any>);
    nestedFields.forEach((nestedField) => updateFieldValues(nestedField, form, isNew, {
      readOnly: field.props.readOnly || undefined,
      disabled: field.props.disabled || undefined,
      hidden: field.props.hidden || undefined,
      changed: field.props.changed || undefined,
      hiddenCollectionAddButton: field.props.hiddenCollectionAddButton || undefined,
    }));
  }
};

export const updateActionValues = (
  action: ActionButton<any, any>,
  form: Record<string, any>,
  isNew: boolean,
) => {
  if (!action.props.inner) {
    action.props.inner = {};
  }

  // Save pure hidden function
  if (typeof action.props.inner.hiddenCondition !== 'function'
    && typeof action.props.hidden === 'function') {
    action.props.inner.hiddenCondition = action.props.hidden;
  }

  const hidden = action.props.inner.hiddenCondition;

  if (typeof hidden === 'function') {
    action.props.hidden = hidden.bind(null, {
      state: form,
      isNew: isNew || false,
      role: globalValues.store.state.role as string,
    });
  }
};

export const useActionButtonChecks = (action: ActionButton<string, any>) => {
  const hidden = computed(() => (typeof action.props.hidden === 'function'
    ? (action.props.hidden as MixedCheckerOptional)()
    : action.props.hidden || false));

  return {
    hidden,
  };
};
