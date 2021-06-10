import type { GenericForm } from 'core/types/form';
import type { FiltersForm } from 'core/types/configs';
import type { Table } from 'core/types/components/table';

export const formController = (config: GenericForm): GenericForm => config;

export const filtersFormController = (config: FiltersForm): FiltersForm => config;

export const tableController = (config: Table): Table => config;
