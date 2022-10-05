import { MixedChecker } from 'lib/utils/core/mixed-check';

export interface InnerConditions {
  disabledCondition: MixedChecker,
  hiddenCondition: MixedChecker,
  readOnlyCondition: MixedChecker,
}
