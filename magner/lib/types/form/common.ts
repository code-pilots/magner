import { MixedChecker } from 'lib/utils/core/mixed-check';

export interface InnerConditions<ENTITY extends {}> {
  disabledCondition: MixedChecker<ENTITY>,
  hiddenCondition: MixedChecker<ENTITY>,
  readOnlyCondition: MixedChecker<ENTITY>,
  changedCondition: MixedChecker<ENTITY>,
  hiddenCollectionAddButtonCondition: MixedChecker<ENTITY>,
}
