import type { TableColumn } from "@/types/components";

export function DataTable<T extends Record<string, string | number>>({ columns, rows }: { columns: TableColumn<T>[]; rows: T[] }) {
  return <div className="content-table-wrap"><table className="content-table"><thead><tr>{columns.map((column) => <th key={String(column.key)}>{column.label}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{columns.map((column) => <td key={String(column.key)}>{String(row[column.key])}</td>)}</tr>)}</tbody></table></div>;
}
