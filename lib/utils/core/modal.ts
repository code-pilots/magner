import type {
  ModalConfig,
} from 'lib/types/utils/modals';
import globalValues from 'lib/global';

export const openModal = <ENTITY extends {}>(config: ModalConfig<ENTITY>) => {
  globalValues.store.dispatch('changeModalComponent', config);
};
