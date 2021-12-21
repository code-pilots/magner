import type { CardConfig } from 'lib/types/configs/pages/card';
import type { TableConfig } from 'lib/types/configs/pages/table';
import type { RouteComponent } from 'vue-router';

interface ModalConfigBase {
  type: 'card' | 'table' | 'custom',
}

interface ModalConfigCard<ENTITY extends {}> extends ModalConfigBase {
  type: 'card',
  config: CardConfig<ENTITY>,
  props: {
    emptyCard: boolean,
    entityId: number | string | null,
    [key: string]: unknown,
  },
}

interface ModalConfigTable<ENTITY extends {}> extends ModalConfigBase {
  type: 'table',
  config: TableConfig<ENTITY>,
  props: {},
}

interface ModalConfigCustom extends ModalConfigBase {
  type: 'custom',
  component: () => RouteComponent,
}

export type ModalConfig<ENTITY extends {}> =
  | ModalConfigCard<ENTITY>
  | ModalConfigTable<ENTITY>
  | ModalConfigCustom;
