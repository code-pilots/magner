import { RouteLocationRaw } from 'vue-router';

export interface TableColumn {
  /** Property name of the field in the row data for specific column */
  prop: string,

  /** Label to display in the header cell */
  label?: string,

  /** Column fixed width */
  width?: number|string,

  /** Minimal width that is distributed in proportion */
  minWidth?: number|string,

  /** Fix the whole column in some corner of the screen */
  fixed?: 'left'|'right'|boolean,

  /** Whether the ASC|DESC sorting is available for this field */
  sortable?: boolean,

  /** Whether the column can be resized */
  resizable?: boolean,
  /** If the content's width is more than in the column, hide the rest of the width and display in the tooltip */
  showOverflowTooltip?: boolean,

  /** Makes column cells links */
  columnLink?: (row: any) => RouteLocationRaw,

  /** Alignment of the content in the cell */
  align?: 'left'|'center'|'right',
  /** Alignment of the table header. If omitted, the value of the above 'align' attribute will be applied */
  headerAlign?: 'left'|'center'|'right',

  /** Class name of cells in the column */
  className?: string,
  /** Class name of the label of this column */
  labelClassName?: string,

  /** A function that formats the content of the column's cells */
  formatter?: (cellValue: any, row: any, column: any, index: number) => any,

  /** A function that creates a Vue template function for the header cell of a column */
  renderHeader?: (data: { column: any, $index: number }) => void,
}

export interface Table {
  columns: TableColumn[],

  /** Text to display in the table when no data is available */
  emptyText?: string,

  /** If present, table row becomes a link (doesn't work on columns with 'columnLink' property) */
  rowLink?: (row: any) => RouteLocationRaw,
}
