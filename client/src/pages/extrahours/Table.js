import React, { useMemo, useState } from "react";
import { useTable, useSortBy, useFilters } from "react-table";
import { format } from "date-fns";

const DateFilter = ({ column: { filterValue, setFilter } }) => {
  return (
    <input
      type="date"
      value={filterValue ? format(new Date(filterValue), "yyyy-MM-dd") : ""}
      onChange={(e) => {
        setFilter(e.target.value ? new Date(e.target.value) : undefined);
      }}
    />
  );
};

const Table = ({ data }) => {
  const [showFilters, setShowFilters] = useState({});

  const columns = useMemo(
    () => [
      {
        Header: "Od",
        accessor: (row) =>
          format(new Date(row.startDateTime), "dd.MM.yyyy HH:mm"),
        id: "startTime",
        Filter: DateFilter,
      },
      {
        Header: "Do",
        accessor: (row) =>
          format(new Date(row.endDateTime), "dd.MM.yyyy HH:mm"),
        id: "endTime",
        Filter: DateFilter,
      },
      {
        Header: "Extra Hours",
        accessor: "extraHours",
        disableSortBy: true,
      },
      {
        Header: "Supervisor",
        accessor: (row) =>
          `${row.supervisor.firstName} ${row.supervisor.lastName}`,
        id: "supervisor",
        disableSortBy: true,
      },
      {
        Header: "Reason",
        accessor: "reason",
        Cell: ({ row, value }) => {
          const [showReason, setShowReason] = useState(false);
          return (
            <div onClick={() => setShowReason(!showReason)}>
              {showReason ? value : value.substring(0, 30) + "..."}
            </div>
          );
        },
        disableSortBy: true,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy },
  } = useTable({ columns, data }, useFilters, useSortBy);

  const toggleSortBy = () => {
    const currentSortBy = sortBy.find((sort) => sort.id === "startTime");
    const direction = currentSortBy
      ? currentSortBy.desc
        ? "asc"
        : "desc"
      : "desc";
    getTableProps().instance.setSortBy([
      { id: "startTime", desc: direction === "desc" },
    ]);
  };

  return (
    <div>
      <table {...getTableProps()} className="w-full table-auto">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="border px-4 py-2 text-left"
                  style={{ minWidth: "150px" }}
                >
                  {column.render("Header")}
                  <span>
                    {column.id === "startTime" && column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                  {column.id === "startTime" ? (
                    <div className="cursor-pointer" onClick={toggleSortBy}>
                      🕵️‍♂️
                    </div>
                  ) : null}
                  {column.canFilter &&
                  (column.id === "startTime" || column.id === "endTime")
                    ? column.render("Filter")
                    : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="border px-4 py-2">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
