import type { BaseComponent, BaseField } from 'core/types/components/base';
import type { RequestFunc } from 'core/types/utils';

/**
 * Props of the Select component from element-ui:
 * https://element-plus.org/#/en-US/component/select#select-attributes
 */
export interface SelectComponent extends BaseComponent {
  placeholder?: string,

  /** Use first option as initially selected */
  defaultFirstOption?: boolean,

  /** Is Select filterable? Default is 'false' */
  filterable?: boolean,
  /** Only if 'filterable:true', custom function to filter items */
  filterMethod?: Function,
  /** Display this text if filtering returned no results */
  noMatchText?: string,

  /** Whether options are loaded from the server */
  remote?: boolean,
  /** Only if 'remote:true', custom function to get items from the server */
  remoteMethod?: RequestFunc,
  /** Only if 'remote:true', display this text when loading */
  loadingText?: string,
  /** Display this text if remote request returned no results */
  noDataText?: string,

  /** Can Select choose several options. If true, chosen options are displayed as tags */
  multiple?: boolean,
  /** Only if 'multiple:true', displays chosen tags as a group with a total amount written */
  collapseTags?: boolean,
  /** Only if 'multiple:true', sets the limit of chosen tags */
  multipleLimit?: number,

  /** The key of a unique field of the Option object */
  valueKey?: string,
  disabled?: boolean,

  /** Can the selected option be cleared? */
  clearable?: boolean,
}

export interface OptionComponent extends Record<string, any> {
  /** Text to be displayed, same as value if omitted */
  label?: string,

  /** Unique value of the Option. Can be omitted if 'valueKey' is chosen in SelectComponent */
  value?: string|number|boolean|Record<string, any>,

  disabled?: boolean,
}

export interface SelectField extends BaseField {
  type: 'select',
  component: SelectComponent,
  options: OptionComponent[],
}
