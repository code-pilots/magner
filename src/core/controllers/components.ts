import type {
  CardConfig, LoginConfig, TableConfig, FiltersForm,
} from 'core/types/configs';
import type { GenericForm } from 'core/types/form';
import type { Table } from 'core/types/components/table';

export const formController = (config: GenericForm): GenericForm => config;

export const filtersFormController = (config: FiltersForm): FiltersForm => config;

export const tableController = (config: Table): Table => config;

export const loginPageController = (config: LoginConfig): LoginConfig => config;

export const tablePageController = (config: TableConfig): TableConfig => config;

export const cardPageController = (config: CardConfig): CardConfig => config;
