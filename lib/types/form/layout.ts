/* eslint-disable no-use-before-define */

import type { RouteComponent } from 'vue-router';
import type { GenericComponent } from './index';
import type { TranslateData } from '../../utils/core/translate';

interface FormLayoutBase {
  title?: TranslateData,
  layout?: GenericFormLayout[],
  fields?: GenericComponent[],
}

interface LayoutPropsBase {
  /** Add any class to the layout block */
  class?: string,
  /** Sets shadow and a padding to the block, visually taking it out of the form */
  isPaper?: boolean,
  /** What type of styles to apply to the title of the block:<br>
   * • label – small text that can group fields in one row<br>
   * • heading – h2 tag that visually separates the group from the form
   */
  titleType?: 'label' | 'heading',
}

/** RowBase defines element-ui el-row's attributes:
 *  https://element-plus.org/#/en-US/component/layout#row-attributes */
interface RowBase extends LayoutPropsBase {
  /** Grid spacing */
  gutter?: number,

  /** Horizontal alignment of flex layout */
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between',

  /** Vertical alignment of flex layout */
  align?: 'top' | 'middle' | 'bottom',

  /** Custom element tag */
  tag?: string,
}

/** Define different column types */
interface RowFields extends FormLayoutBase {
  type: 'row',
  props: RowBase,
  layout?: never,
  component?: never,
  fields: GenericComponent[],
}
interface RowLayout extends FormLayoutBase {
  type: 'row',
  props: RowBase,
  layout: GenericFormLayout[],
  component?: never,
  fields?: never,
}
export type FormLayoutRow = RowLayout | RowFields;

/** ColumnBase defines element-ui el-col's attributes:
 *  https://element-plus.org/#/en-US/component/layout#col-attributes */
interface ColumnBase extends LayoutPropsBase {
  /** Number of column the grid spans */
  span?: number,

  /** Number of spacing on the left side of the grid */
  offset?: number,

  /** Number of columns that grid moves to the right */
  push?: number,

  /** Number of columns that grid moves to the left */
  pull?: number,

  /** Column Span for <768px */
  xs?: number | { span: number, offset: number },
  /** Column Span for ≥768px */
  sm?: number | { span: number, offset: number },
  /** Column Span for ≥992px */
  md?: number | { span: number, offset: number },
  /** Column Span for ≥1200px */
  lg?: number | { span: number, offset: number },
  /** Column Span for ≥1920px */
  xl?: number | { span: number, offset: number },

  /** Custom element tag */
  tag?: string,
}

/** Define different column types */
export interface ColumnFields extends FormLayoutBase {
  type: 'column',
  props: ColumnBase,
  layout?: never,
  component?: never,
  fields: GenericComponent[],
}
export interface ColumnLayout extends FormLayoutBase, ColumnBase {
  type: 'column',
  props: ColumnBase,
  layout: GenericFormLayout[],
  component?: never,
  fields?: never,
}

export type FormLayoutColumn = ColumnLayout | ColumnFields;

/** Custom layout allows adding your own components */
export interface FormLayoutCustom extends FormLayoutBase {
  type: 'custom',
  layout?: never,
  fields?: never,
  component: () => (RouteComponent | (() => Promise<RouteComponent>)),
  props: Record<string, any>,
}

export type GenericFormLayout = FormLayoutRow | FormLayoutColumn | FormLayoutCustom;

/** Form layout. Allows creating infinitely-nested layouts of rows, columns and custom components */
export type FormLayout = GenericFormLayout | GenericComponent[];
