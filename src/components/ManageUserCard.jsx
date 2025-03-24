import React, { useEffect, useState } from "react";
import {
  adminGetAllUser,
  getMarquersAdminWithUid,
  updateUserWithId,
} from "../../api/getCountryData";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import _ from "lodash";
import { Filter } from "./Filter";
function ManageUserCard({
  setOpenManageUser,
  setOpenCardAdmin,
  setDisplayMarquer,
  setLoading,
}) {
  const [totalUser, setTotalUser] = useState([]);

  const [filteredData, setFilteredData] = useState(totalUser);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [desableStatus, setDesableStatus] = useState(false);
  const [desableDisplayMarqueur, setDesableDisplayMarqueur] = useState(false);

  const displayMarqueur = async (uid) => {
    try {
      setLoading(true);
      setDesableDisplayMarqueur(true);
      const result = await getMarquersAdminWithUid(uid);

      setDisplayMarquer([...result]);
      setLoading(false);
      setDesableDisplayMarqueur(false);
      setOpenManageUser(false);
      setOpenCardAdmin(false);
    } catch (error) {
      setLoading(false);
      alert(
        "Une erreur est survenue pendant le chargement des données vérifie ta connexion internet"
      );
    }
  };

  const changeStatus = async (id, status) => {
    try {
      setLoading(true);
      setDesableStatus(true);
      if (status === "activate") {
        const data = {
          status: "desactivate",
        };
        await updateUserWithId(id, data);

        const users = await adminGetAllUser();

        if (users) {
          setTotalUser([...users]);
          setFilteredData([...users]);
        }
        setDesableStatus(false);
        setLoading(false);
        return;
      }

      if (status === "desactivate") {
        const data = {
          status: "activate",
        };
        await updateUserWithId(id, data);

        const users = await adminGetAllUser();

        if (users) {
          setTotalUser([...users]);
          setFilteredData([...users]);
        }
        setDesableStatus(false);
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
      alert(
        "Une erreur est survenue pendant le chargement des données vérifie ta connexion internet"
      );
    }
  };

  /*  const handleSearch = (value) => {
    setSearchInput(value);
    const result = totalUser.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(result);
  }; */

  /* const columns = React.useMemo(
    () => [
      { Header: "Email", accessor: "email" },
      { Header: "Role", accessor: "role" },
      { Header: "Status", accessor: "status" },
    ],
    []
  ); */

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "email",
        header: () => <span>Email</span>,
        cell: (info) => (
          <p style={{ width: "100%", textAlign: "center" }}>
            {info.getValue()}
          </p>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "role",
        header: () => <span>Role</span>,
        cell: (info) => (
          <p style={{ width: "100%", textAlign: "center" }}>
            {info.getValue()}
          </p>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "uid",
        header: () => <span>marqueurs</span>,
        cell: (info) => {
          const uid = info.getValue();

          return (
            <button
              disabled={desableDisplayMarqueur}
              style={{
                backgroundColor: "#3772f1",
                color: "white",
                width: "100%",
                textAlign: "center",
              }}
              onClick={() => displayMarqueur(uid)}
            >
              Voir
            </button>
          );
        },
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (row) => {
          const value = row.row.original;
          const status = value.status;
          const style = {
            backgroundColor: status === "activate" ? "#3772f1" : "#f06b53",
            color: "white",
            width: "100%",
            textAlign: "center",
          };

          return (
            <button
              style={style}
              onClick={() => {
                changeStatus(value.id, value.status);
              }}
              disabled={desableStatus}
            >
              {status === "activate" ? "ON" : "OFF"}
            </button>
          );
        },
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  useEffect(() => {
    const getAllUser = async () => {
      try {
        setLoading(true);
        const users = await adminGetAllUser();

        if (users) {
          setTotalUser([...users]);
          setFilteredData([...users]);
          setLoading(false);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert(
          "Une erreur est survenue pendant le chargement des données vérifie ta connexion internet"
        );
      }
    };

    getAllUser();
  }, []);

  return (
    <div className="userCardFirst">
      <div className="ContainerCardFirst">
        <p
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: "20px",
            margin: "20px 0px",
            padding: "10px",
            fontWeight: "bold",
            background: "#fff700",
            border: "none",
          }}
        >
          Gestion des utilisateurs
        </p>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted()] ?? null}
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id} style={{ border: "1px solid lightgray" }}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        style={{ border: "1px solid lightgray" }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ marginTop: "10px" }} />
        <div className="flex items-center gap-2">
          <button
            className="border rounded p-1"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} sur{" "}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Aller à la page:
            <input
              type="number"
              min="1"
              max={table.getPageCount()}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Affiche {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div>
          Affichage de {table.getRowModel().rows.length.toLocaleString()}{" "}
          rangées sur {table.getRowCount().toLocaleString()}
        </div>
        <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>

        {/* Pagination Controls */}
        {/*  <div style={{ marginTop: "10px" }}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>
        <button
          onClick={() => gotoPage(pageOptions.length - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>
      </div> */}
        <div style={{ marginTop: "10px" }}></div>
        <button
          className="isdeconnexion"
          onClick={() => {
            setOpenCardAdmin(true);
            setOpenManageUser(false);
          }}
        >
          Retour
        </button>
      </div>
    </div>
  );
}

export default ManageUserCard;
