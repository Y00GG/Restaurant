"use client";
import { BottomContent, DynamicTable, TopContent } from "@components/common";
import { CreateWaiterModal, EditWaiterModal } from "@components/waiter";
import type { IColumn } from "@interfaces/ITableState";
import type { IWaiter } from "@interfaces/IWaiter";
import { Button, useDisclosure } from "@nextui-org/react";
import { useWaiterStore } from "@store/waiter.store";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { waiters } from "./data";

const Waiter = () => {
	const { getWaiters } = useWaiterStore();

	const {
		isOpen: isOpenEdit,
		onOpen: onOpenEdit,
		onOpenChange: onOpenChangeEdit,
	} = useDisclosure();
	const {
		isOpen: isOpenCreate,
		onOpen: onOpenCreate,
		onOpenChange: onOpenChangeCreate,
	} = useDisclosure();
	const [selectedWaiter, setSelectedWaiter] = useState<IWaiter | null>(null);
	const [filterValue, setFilterValue] = useState<string>("");
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);
	const [page, setPage] = useState<number>(1);

	const totalMessage = `Total de ${waiters.length} registros`;

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

	const columns: IColumn<IWaiter>[] = [
		{ name: "NOMBRE", uid: "name", sortable: true },
		{ name: "TELÉFONO", uid: "phone", sortable: true },
		{ name: "No IDENTIDAD", uid: "cc", sortable: true },
		{
			name: "ACCIONES",
			uid: "actions",
			renderCell: (item) => (
				<div className="flex justify-start items-center gap-2">
					<Button
						isIconOnly
						color="secondary"
						onClick={() => {
							setSelectedWaiter(item);
							onOpenEdit();
						}}
					>
						<FaEdit />
					</Button>
					<Button isIconOnly color="danger">
						<MdDelete />
					</Button>
				</div>
			),
		},
	];

	useEffect(() => {
		getWaiters();
	}, [getWaiters]);

	return (
		<div className="flex justify-center items-center">
			<div className="container px-8 md:px-0 py-8 flex flex-col gap-3">
				<p className="text-4xl font-bold text-success">Lista de meseros</p>
				<DynamicTable
					rows={waiters}
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
							onOpenCreate={onOpenCreate}
						/>
					}
					bottomContent={
						<BottomContent
							selectedKeys={new Set()}
							filteredItemsLength={waiters.length}
							page={page}
							pages={Math.ceil(waiters.length / rowsPerPage)}
							handlePageChange={handlePageChange}
						/>
					}
				/>
				<CreateWaiterModal
					isOpen={isOpenCreate}
					onOpenChange={onOpenChangeCreate}
				/>
				{selectedWaiter && (
					<EditWaiterModal
						isOpen={isOpenEdit}
						onOpenChange={onOpenChangeEdit}
						waiter={selectedWaiter}
					/>
				)}
			</div>
		</div>
	);
};

export default Waiter;
