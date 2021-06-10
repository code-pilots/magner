export interface TableRow {
  prop: string,
  label?: string,
  width?: number|string,
}

export interface Table {
  rows: TableRow[],
}
