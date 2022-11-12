//data table component for solidjs that is size adjustable and sortable

import { createSignal, createEffect, JSX, mapArray } from "solid-js";
import { For, Index } from "solid-js/web";

interface IDataTableProps {
  data: any[];
  columns: IDataTableColumn[];
  height: number;
  width: number;
}

interface IDataTableColumn {
  column: string;
  width: number;
  label: string;
}

export const DataTable = (props: IDataTableProps) => {
  const [tableData, setTableData] = createSignal(props.data);
  const [tableColumns, setTableColumns] = createSignal(props.columns);
  const [tableHeight, setTableHeight] = createSignal(props.height);
  const [tableWidth, setTableWidth] = createSignal(props.width);
  const [tableSortDirection, setTableSortDirection] = createSignal("");
  const [tableSortColumn, setTableSortColumn] = createSignal("");

  console.log(tableData());

  const sortColumn = (column: string) => {
    const sortDirection =
      tableSortColumn() === column ? tableSortDirection() : "";
    setTableSortColumn(column);
    setTableSortDirection(sortDirection);
    setTableData(
      tableData().sort((a, b) => {
        if (a[column] < b[column]) {
          return sortDirection === "asc" ? 1 : -1;
        }
        if (a[column] > b[column]) {
          return sortDirection === "asc" ? -1 : 1;
        }
        return 0;
      })
    );
    console.log(tableData());
  };

  return (
    <div class="table-container">
      <table
        class="table"
        style={`width: ${tableWidth()}px; height: ${tableHeight()}px;`}
      >
        <thead>
          <tr>
            <For each={tableColumns()}>
              {(column) => (
                <th
                  style={`width: ${column.width}px;`}
                  class="table-header"
                  onClick={() => {
                    sortColumn(column.column);
                  }}
                >
                  {column.column}
                </th>
              )}
            </For>
          </tr>
        </thead>
        <tbody>
          {mapArray(() => tableData(), (row, index) => (
            <tr>
                {
                    mapArray(() => tableColumns(), (column) => (
                        <td>{row[column.column]}</td>
                    ))
                }
              {/* <For each={tableColumns()}>
                {(column) => (
                  <td style={`width: ${column.width}px;`}>
                    {row[column.column]}
                  </td>
                )}
              </For> */}
            </tr>
          ))}
          {/* <For each={tableData()}>
            {(row) => (
              <tr>
                <Index each={tableColumns()}>
                  {(column) => <td>{row[column().column]}</td>}
                </Index>
              </tr>
            )}
          </For> */}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

//a function that changes a value of a createStore object
