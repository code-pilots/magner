import type {
  CardConfig, LoginConfig, TableConfig, FiltersForm,
} from 'lib/types/configs';
import type { GenericForm } from 'lib/types/form';
import type { Table } from 'lib/types/components/table';

export const formController = <ENTITY extends {}>(config: GenericForm<ENTITY>): GenericForm<ENTITY> => config;

export const filtersFormController = <ENTITY extends {}>(config: FiltersForm<ENTITY>): FiltersForm<ENTITY> => config;

export const tableController = <ENTITY extends {}>(config: Table<ENTITY>): Table<ENTITY> => config;

export const loginPageController = (config: LoginConfig): LoginConfig => config;

export const tablePageController = <ENTITY extends {}>(config: TableConfig<ENTITY>)
  : TableConfig<ENTITY> => config;

export const cardPageController = <ENTITY extends {}>(config: CardConfig<ENTITY>): CardConfig<ENTITY> => config;
