import { computed } from 'vue';
import type { GenericComponent } from 'lib/types/form/form';

export type MixedChecker = (data: {
  role: string,
  state: Record<string, unknown>,
}) => boolean;

type MixedCheckerOptional = (data?: {
  role: string,
  state: Record<string, unknown>,
}) => boolean;

export const mixedCheck = (checker: MixedChecker): MixedChecker => checker;

export const useChecks = (field: GenericComponent) => {
  const disabled = computed(() => (typeof field.props.disabled === 'function'
    ? (field.props.disabled as MixedCheckerOptional)()
    : field.props.disabled));

  const hidden = computed(() => (typeof field.props.hidden === 'function'
    ? (field.props.hidden as MixedCheckerOptional)()
    : field.props.hidden));

  const readOnly = computed(() => (typeof field.props.readOnly === 'function'
    ? (field.props.readOnly as MixedCheckerOptional)()
    : field.props.readOnly));

  return {
    disabled,
    hidden,
    readOnly,
  };
};
