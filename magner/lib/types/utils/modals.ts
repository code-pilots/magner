import type { CardConfig } from 'lib/types/configs/pages/card';
import type { TableConfig } from 'lib/types/configs/pages/table';
import type { RouteComponent } from 'vue-router';

interface ModalConfigBase {
  type: 'card' | 'table' | 'custom',
  handleBeforeClose?: boolean;
}

/** If modals are opened on the Card page, they receive form data and information about the entity */
interface ModalConfigCard<ENTITY extends {}> extends ModalConfigBase {
  type: 'card',
  config: CardConfig<ENTITY>,
  /** Properties of the Card page */
  props: {
    emptyCard: boolean,
    entityId: number | string | null,
  },
}

/** If modals are opened on the Table page, they receive filters data and what rows were selected (if any) */
interface ModalConfigTable<ENTITY extends {}> extends ModalConfigBase {
  type: 'table',
  config: TableConfig<ENTITY>,
  /** Properties of the Table page */
  props: {},
}

/** Custom modals require dynamic component to be passed */
interface ModalConfigCustom extends ModalConfigBase {
  type: 'custom',
  /** Component to be displayed inside the modal window */
  component: () => RouteComponent,
  /** Pass props to the custom component */
  props: Record<string, any>,
}

/**
 * ModalConfig is an argument to `openModal` function.
 * It accepts type of the content to display inside the modal and specific fields for each type.
 */
export type ModalConfig<ENTITY extends {}> =
  | ModalConfigCard<ENTITY>
  | ModalConfigTable<ENTITY>
  | ModalConfigCustom;
