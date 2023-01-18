import type { TranslateData } from 'lib/utils/core/translate';
import type { RequestWrap } from 'lib/types/utils/api';
import type { BaseField, BaseProps } from '../base';

/**
 * Props of the Select component from element-ui:
 * https://element-plus.org/#/en-US/component/select#select-attributes
 */
export interface SelectProps<ENTITY extends {}> extends BaseProps<ENTITY> {
  placeholder?: TranslateData,

  /** Use first option as initially selected */
  defaultFirstOption?: boolean,

  /** Is Select filterable? Default is 'false' */
  filterable?: boolean,
  /** Only if 'filterable:true', custom function to filter items */
  filterMethod?: Function,
  /** Display this text if filtering returned no results */
  noMatchText?: TranslateData,

  /** When filtering, allow creation of new elements */
  allowCreate?: boolean,

  /** Whether options are loaded from the server. Works only if 'filterable:true' is set */
  remote?: boolean,
  /** Only if 'remote:true', custom function to get items from the server */
  remoteMethod?: RequestWrap,
  /** Only if 'remote:true', display this text when loading */
  loadingText?: TranslateData,
  /** Display this text if remote request returned no results */
  noDataText?: TranslateData,

  /** Can Select choose several options. If true, chosen options are displayed as tags */
  multiple?: boolean,
  /** Only if 'multiple:true', displays chosen tags as a group with a total amount written */
  collapseTags?: boolean,
  /** Only if 'multiple:true', sets the limit of chosen tags */
  multipleLimit?: number,

  /** The key of a unique field of the Option object */
  valueKey?: string,
  /** The key of a label field of the Option object */
  labelKey?: string,
  /** Format options to specific text. Overrides the 'labelKey' property */
  labelFormatter?: (option: unknown) => string,

  /** Can the selected option be cleared? */
  clearable?: boolean,

  loadRemoteMethodOnFocus?: boolean
}

export interface OptionComponent extends Record<string, any> {
  /** Text to be displayed, same as value if omitted */
  label?: TranslateData,

  /** Unique value of the Option. Can be omitted if 'valueKey' is chosen in SelectComponent */
  value?: string|number|boolean|Record<string, any>,
}

export interface SelectField<ENTITY extends {}> extends BaseField<ENTITY> {
  type: 'select',
  props: SelectProps<ENTITY>,
  options: OptionComponent[],
}
