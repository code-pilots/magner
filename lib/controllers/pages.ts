import type {
  CardConfig, LoginConfig, TableConfig, FiltersForm,
} from '../types/configs';
import type { GenericForm } from '../types/form';
import type { Table } from '../types/components/table';

export const formController = (config: GenericForm): GenericForm => config;

export const filtersFormController = (config: FiltersForm): FiltersForm => config;

export const tableController = (config: Table): Table => config;

export const loginPageController = (config: LoginConfig): LoginConfig => config;

export const tablePageController = (config: TableConfig): TableConfig => config;

export const cardPageController = (config: CardConfig): CardConfig => config;
