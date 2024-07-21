"use client";
import { BottomContent, DynamicTable, TopContent } from "@components/common";
import type { IMenu } from "@interfaces/IMenu";
import type { IColumn } from "@interfaces/ITableState";
import { Button, useDisclosure } from "@nextui-org/react";
import { formatPrice } from "@utils/formatPrice";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CreateMenuModal from "./CreateMenuModal";
import EditMenuModal from "./EditWaiterModal";
import { menus } from "./data";

const MenuContainer = () => {
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
	const [selectedMenu, setSelectedMenu] = useState<IMenu | null>(null);
	const [filterValue, setFilterValue] = useState<string>("");
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);
	const [page, setPage] = useState<number>(1);

	const totalMessage = `Total de ${menus.length} registros`;

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

	const columns: IColumn<IMenu>[] = [
		{ name: "NOMBRE", uid: "name", sortable: true },
		{ name: "INGREDIENTES", uid: "ingredients", sortable: true },
		{
			name: "PRECIO",
			uid: "price",
			sortable: true,
			renderCell: (item) => formatPrice(item.price),
		},
		{
			name: "ACCIONES",
			uid: "actions",
			renderCell: (item) => (
				<div className="flex justify-start items-center gap-2">
					<Button
						isIconOnly
						color="secondary"
						onClick={() => {
							setSelectedMenu(item);
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

	return (
		<div className="flex justify-center items-center">
			<div className="container px-8 md:px-0 py-8 flex flex-col gap-3">
				<p className="text-4xl font-bold text-success">Menu del restaurante</p>
				<DynamicTable
					rows={menus}
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
							filteredItemsLength={menus.length}
							page={page}
							pages={Math.ceil(menus.length / rowsPerPage)}
							handlePageChange={handlePageChange}
						/>
					}
				/>
				<CreateMenuModal
					isOpen={isOpenCreate}
					onOpenChange={onOpenChangeCreate}
				/>
				{selectedMenu && (
					<EditMenuModal
						isOpen={isOpenEdit}
						onOpenChange={onOpenChangeEdit}
						menu={selectedMenu}
					/>
				)}
			</div>
		</div>
	);
};

export default MenuContainer;
