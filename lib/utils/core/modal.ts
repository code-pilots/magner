import type {
  ModalConfig,
} from 'lib/types/utils/modals';
import globalValues from 'lib/global';

/**
 * `openModal` can open any Card, Table or custom component any time on any page.
 *
 * For this, pass the `ModalConfig` object as an argument with the `type` field telling
 * what type (card, table or custom) of content should be displayed inside a modal, and
 * with specific properties for each type.
 *
 * `openModal` returns promise. Therefore, you can `await` it. For example, if you created
 * the `card` type of modal, promise either resolves to the form data and result of submitting
 * the form, or rejects with the error.
 */
export const openModal = <ENTITY extends {}>(config: ModalConfig<ENTITY>) => new Promise(
  (resolve, reject) => {
    globalValues.store.dispatch('changeModalComponent', {
      config,
      handleSuccess: (data: unknown) => resolve(data),
      handleFail: (data: unknown) => reject(data),
    });
  },
);
