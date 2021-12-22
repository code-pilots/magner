import type {
  ModalConfig,
} from 'lib/types/utils/modals';
import globalValues from 'lib/global';

export const openModal = <ENTITY extends {}>(config: ModalConfig<ENTITY>) => new Promise(
  (resolve, reject) => {
    globalValues.store.dispatch('changeModalComponent', {
      config,
      handleSuccess: (data: unknown) => resolve(data),
      handleFail: (data: unknown) => reject(data),
    });
  },
);
