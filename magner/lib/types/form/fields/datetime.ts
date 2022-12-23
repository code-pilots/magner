import type { TranslateData } from 'lib/utils/core/translate';
import type { BaseField, BaseProps } from '../base';

export interface DateTimeProps<ENTITY extends {}> extends BaseProps<ENTITY> {
  /** Type of the DateTime picker. Please, refer to the https://element-plus.org/#/en-US/component/datetime-picker */
  type: 'year' | 'month' | 'date' | 'dates' | 'datetime' | 'week' | 'datetimerange' | 'daterange' | 'monthrange' | 'time' | 'timerange',

  /** Format of the displayed value in the input box */
  format?: string,

  /** Format of the value emitted from the DateTime picker */
  valueFormat?: string,

  /** Placeholder in non-range mode */
  placeholder?: TranslateData,
  /** Placeholder for the start date in range mode */
  startPlaceholder?: TranslateData,
  /** Placeholder for the end date in range mode */
  endPlaceholder?: TranslateData,

  /** Whether the input is editable. Default is 'true' */
  editable?: boolean,

  /** Popper class name */
  popperClass?: string,

  /** Range separator. Default is '-' */
  rangeSeparator?: string,

  /** Optional, default date of the calendar */
  defaultValue?: Date,
  /** Default time value after picking a date. If non-range, just Date. If range, array of two Dates */
  defaultTime?: Date | [Date, Date],

  /** Allow both panels of the picker select month and year independently of each other */
  unlinkPanels?: boolean,

  /** Whether to show clear button */
  clearable?: boolean,

  /** Function determining if a date is disabled with that date as its parameter. */
  disabledDate?: (time: Date) => boolean
}

export interface DateTimeField<ENTITY extends {}> extends BaseField<ENTITY> {
  type: 'datetime',
  dataType: 'date' | 'array',
  props: DateTimeProps<ENTITY>,
}
