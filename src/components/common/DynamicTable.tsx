"use client";

import type { IBaseItem, IColumn } from "@interfaces/ITableState";
import {
	type Selection,
	type SortDescriptor,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";
import {
	type Key,
	type ReactNode,
	useCallback,
	useMemo,
	useState,
} from "react";

interface DynamicTableProps<T extends IBaseItem> {
	rows: T[];
	columns: IColumn<T>[];
	emptyMessage?: string;
	enableSelection?: boolean;
	topContent?: ReactNode;
	bottomContent?: ReactNode;
	filterValue?: string;
	rowsPerPage?: number;
	page?: number;
	removeWrapper?: boolean;
}

const DynamicTable = <T extends IBaseItem>({
    rows = [], // Aseguramos que rows sea siempre un array
    columns,
    emptyMessage = "No se encontraron registros.",
    enableSelection = false,
    topContent,
    bottomContent,
    filterValue = "",
    rowsPerPage = 5,
    page = 1,
    removeWrapper = false,
}: DynamicTableProps<T>) => {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "id",
        direction: "ascending",
    });

    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = useMemo(() => {
        let filteredData = [...rows]; // rows ahora siempre será un array
        if (hasSearchFilter) {
            filteredData = filteredData.filter((item) =>
                columns.some((col) => {
                    if (col.uid === "actions") return false;
                    const value = String(item[col.uid as keyof T]).toLowerCase();
                    return value.includes(filterValue.toLowerCase());
                }),
            );
        }
        return filteredData;
    }, [filterValue, rows, columns, hasSearchFilter]);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column as keyof T];
            const second = b[sortDescriptor.column as keyof T];

            if (typeof first === "string" && typeof second === "string") {
                return sortDescriptor.direction === "descending"
                    ? second.localeCompare(first)
                    : first.localeCompare(second);
            }

            if (typeof first === "number" && typeof second === "number") {
                return sortDescriptor.direction === "descending"
                    ? second - first
                    : first - second;
            }

            return 0;
        });
    }, [sortDescriptor, items]);

    const renderCell = useCallback(
        (item: T, columnKey: Key): ReactNode => {
            const column = columns.find((col) => col.uid === columnKey);
            if (column?.renderCell) return column.renderCell(item);
            const value = item[columnKey as keyof T];
            return value != null ? String(value) : null;
        },
        [columns],
    );

    return (
        <Table
            removeWrapper={removeWrapper}
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{ wrapper: "max-h-[360px]" }}
            selectedKeys={selectedKeys}
            selectionMode={enableSelection ? "multiple" : "none"}
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.uid.toString()}
                        align={column.align ?? "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={emptyMessage} items={sortedItems}>
                {(item) => (
                    <TableRow key={String(item.id)}>
                        {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default DynamicTable;
