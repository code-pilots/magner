/* eslint-disable no-use-before-define */

import type { GenericComponent } from 'core/types/form/index';
import type { RouteComponent } from 'vue-router';

interface FormLayoutBase {
  title?: string,
  class?: string,
  layout?: GenericFormLayout[],
  fields?: GenericComponent[],
}

/** Define different row types */
export interface RowFields extends FormLayoutBase {
  type: 'row',
  layout?: never,
  fields: GenericComponent[],
}
export interface RowLayout extends FormLayoutBase {
  type: 'row',
  layout: GenericFormLayout[],
  fields?: never,
}

export type FormLayoutRow = RowLayout | RowFields;

/** Define different column types */
export interface ColumnFields extends FormLayoutBase {
  type: 'column',
  layout?: never,
  fields: GenericComponent[],
}
export interface ColumnLayout extends FormLayoutBase {
  type: 'column',
  layout: GenericFormLayout[],
  fields?: never,
}

export type FormLayoutColumn = ColumnLayout | ColumnFields;

/** Custom layout allows adding your own components */
export interface FormLayoutCustom extends FormLayoutBase {
  type: 'custom',
  layout?: never,
  fields?: never,
  component: RouteComponent | (() => Promise<RouteComponent>),
}

export type GenericFormLayout = FormLayoutRow | FormLayoutColumn | FormLayoutCustom;

/** Form layout. Allows creating infinitely-nested layouts of rows, columns and custom components */
export type FormLayout = GenericFormLayout | GenericComponent[];
