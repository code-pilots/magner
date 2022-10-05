/* eslint-disable no-use-before-define */

import type { RouteComponent } from 'vue-router';
import type { TranslateData } from 'lib/utils/core/translate';
import { MixedChecker } from 'lib/utils/core/mixed-check';
import type { GenericComponent, InnerConditions } from './index';

interface FormLayoutBase<ENTITY extends {}> {
  title?: TranslateData,
  layout?: GenericFormLayout<ENTITY>[],
  fields?: GenericComponent<ENTITY>[],
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

  /** Style object to be applied to the row or column */
  styles?: Record<string, string>,

  /** Style object to be applied to the row or column of mobile breakpoint */
  mobileStyles?: Record<string, string>,

  /** Hides the layout if 'true' */
  hidden?: boolean | MixedChecker;

  /** Magner's inner properties. No need to change */
  inner?: Partial<InnerConditions>
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

  /** Whether nested elements of the row should take full width or not */
  elementsGrow?: boolean,

  /** Custom element tag */
  tag?: string,
}

/** Define different column types */
interface RowFields<ENTITY extends {}> extends FormLayoutBase<ENTITY> {
  type: 'row',
  props: RowBase,
  layout?: never,
  component?: never,
  fields: GenericComponent<ENTITY>[],
}
interface RowLayout<ENTITY extends {}> extends FormLayoutBase<ENTITY> {
  type: 'row',
  props: RowBase,
  layout: GenericFormLayout<ENTITY>[],
  component?: never,
  fields?: never,
}
export type FormLayoutRow<ENTITY extends {}> = RowLayout<ENTITY> | RowFields<ENTITY>;

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
export interface ColumnFields<ENTITY extends {}> extends FormLayoutBase<ENTITY> {
  type: 'column',
  props: ColumnBase,
  layout?: never,
  component?: never,
  fields: GenericComponent<ENTITY>[],
}
export interface ColumnLayout<ENTITY extends {}> extends FormLayoutBase<ENTITY>, ColumnBase {
  type: 'column',
  props: ColumnBase,
  layout: GenericFormLayout<ENTITY>[],
  component?: never,
  fields?: never,
}

export type FormLayoutColumn<ENTITY extends {}> = ColumnLayout<ENTITY> | ColumnFields<ENTITY>;

/** Custom layout allows adding your own components */
export interface FormLayoutCustom<ENTITY extends {}> extends FormLayoutBase<ENTITY> {
  type: 'custom',
  layout?: never,
  fields?: never,
  component: () => (RouteComponent | (() => Promise<RouteComponent>)),
  props: Record<string, any>,
}

export type GenericFormLayout<ENTITY extends {}> =
  | FormLayoutRow<ENTITY>
  | FormLayoutColumn<ENTITY>
  | FormLayoutCustom<ENTITY>;

/** Form layout. Allows creating infinitely-nested layouts of rows, columns and custom components */
export type FormLayout<ENTITY extends {}> = GenericFormLayout<ENTITY> | GenericComponent<ENTITY>[];
