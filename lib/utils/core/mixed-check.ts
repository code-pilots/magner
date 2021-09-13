import { computed } from 'vue';
import type { GenericComponent } from '../../types/form';

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

  return {
    disabled,
  };
};
