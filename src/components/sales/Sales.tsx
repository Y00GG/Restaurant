"use client";

import { BottomContent, DynamicTable } from "@components/common";
import TopContent from "@components/common/TopContent";
import type { ISale } from "@interfaces/ISale";
import type { IColumn } from "@interfaces/ITableState";
import { type DateValue, parseDate } from "@internationalized/date";
import { Button, Spacer, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { ConsultSaleModal } from ".";
import MostSoldDishes from "./MostSoldDishes";
import TotalSalesByDishes from "./TotalSalesByDishes";
import { sales } from "./data";

const Sales = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedSale, setSelectedSale] = useState<ISale | null>(null);
	const [filterValue, setFilterValue] = useState<string>("");
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);
	const [page, setPage] = useState<number>(1);
	const [dateRange, setDateRange] = useState<{
		startDate: DateValue;
		endDate: DateValue;
	}>({
		startDate: parseDate(new Date().toISOString().split("T")[0]),
		endDate: parseDate(new Date().toISOString().split("T")[0]),
	});

	const totalMessage = `Total de ${sales.length} registros`;

	const handleSearchChange = (value?: string) => {
		setFilterValue(value || "");
		setPage(1);
	};

	const handleClear = () => {
		setFilterValue("");
		setPage(1);
	};

	const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setRowsPerPage(Number(e.target.value));
		setPage(1);
	};

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	const handleDateRangeChange = (range: {
		startDate: DateValue;
		endDate: DateValue;
	}) => {
		setDateRange(range);
	};

	const columns: IColumn<ISale>[] = [
		{ name: "FECHA", uid: "date", sortable: true },
		{ name: "MESERO", uid: "waiter", sortable: true },
		{
			name: "VENTAS TOTALES",
			uid: "totalSales",
			sortable: true,
		},
		{
			name: "ACCIONES",
			uid: "actions",
			renderCell: (item) => (
				<div className="flex justify-start items-center gap-2">
					<Button
						isIconOnly
						color="primary"
						onClick={() => {
							setSelectedSale(item);
							onOpen();
						}}
					>
						<FaEye />
					</Button>
				</div>
			),
		},
	];

	return (
		<div className="flex justify-center items-center">
			<div className="container px-8 md:px-0 py-8 flex gap-3">
				<div className="w-3/4">
					<p className="text-4xl font-bold text-success mb-4">Ventas</p>
					<DynamicTable
						rows={sales}
						columns={columns}
						filterValue={filterValue}
						rowsPerPage={rowsPerPage}
						page={page}
						topContent={
							<TopContent
								filterValue={filterValue}
								onSearchChange={handleSearchChange}
								onClear={handleClear}
								totalMessage={totalMessage}
								rowsPerPage={rowsPerPage}
								onRowsPerPageChange={handleRowsPerPageChange}
								startDate={dateRange.startDate}
								endDate={dateRange.endDate}
								onDateRangeChange={handleDateRangeChange}
							/>
						}
						bottomContent={
							<BottomContent
								selectedKeys={new Set()}
								filteredItemsLength={sales.length}
								page={page}
								pages={Math.ceil(sales.length / rowsPerPage)}
								handlePageChange={handlePageChange}
							/>
						}
					/>
				</div>
				<div className="w-1/4 flex flex-col gap-4 justify-between items-center">
					<div className="p-4 w-full">
						<p className="text-2xl font-bold">Platos más vendidos</p>
						<Spacer y={1} />
						<MostSoldDishes />
					</div>
					<div className="p-4 w-full">
						<p className="text-2xl font-bold">Total ventas por plato</p>
						<Spacer y={1} />
						<TotalSalesByDishes />
					</div>
				</div>
			</div>
			{selectedSale && (
				<ConsultSaleModal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					sale={selectedSale}
				/>
			)}
		</div>
	);
};

export default Sales;
