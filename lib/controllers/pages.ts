import type {
  CardConfig, LoginConfig, TableConfig, FiltersForm,
} from 'lib/types/configs';
import type { GenericForm } from 'lib/types/form';
import type { Table } from 'lib/types/components/table';

export const formController = (config: GenericForm): GenericForm => config;

export const filtersFormController = (config: FiltersForm): FiltersForm => config;

export const tableController = <ENTITY extends {}>(config: Table<ENTITY>): Table<ENTITY> => config;

export const loginPageController = (config: LoginConfig): LoginConfig => config;

export const tablePageController = <ENTITY extends {}>(config: TableConfig<ENTITY>)
  : TableConfig<ENTITY> => config;

export const cardPageController = (config: CardConfig): CardConfig => config;
