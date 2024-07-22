"use client";
import { BottomContent, DynamicTable, TopContent } from "@components/common";
import type { IMenuItem, IOrder } from "@interfaces/IOrder";
import type { IColumn } from "@interfaces/ITableState";
import { Button, Divider, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { CreateOrderModal, TodayMenu } from ".";

const Orders: React.FC = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const notify = (order: number, status: "done" | "cancel") => {
		toast(`Pedido ${order} ${status ? "entregado" : "cancelado"}.`, {
			type: "success",
			position: "top-center",
		});
	};
	const [orders, setOrders] = useState<IOrder[]>([
		{ id: 1, description: "Plato 1 (2), Plato 2 (1)", status: "completed" },
		{ id: 2, description: "Plato 1 (1)", status: "completed" },
		{ id: 3, description: "Plato 2 (3), Plato 3 (2)", status: "completed" },
		{ id: 4, description: "Plato 1 (5), Plato 3 (2)", status: "completed" },
	]);
	const [filterValue, setFilterValue] = useState<string>("");
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);
	const [page, setPage] = useState<number>(1);

	const totalMessage = `Total de ${orders.length} registros`;

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

	const columns: IColumn<IOrder>[] = [
		{ name: "#", uid: "id" },
		{ name: "Pedido", uid: "description" },
		{
			name: "Confirmar",
			uid: "actions",
			renderCell: ({ id }) => (
				<div className="flex justify-start items-center gap-2">
					<Button isIconOnly color="success" onClick={() => notify(id, "done")}>
						<FaCheckCircle />
					</Button>
					<Button
						isIconOnly
						color="danger"
						onClick={() => notify(id, "cancel")}
					>
						<IoMdClose />
					</Button>
				</div>
			),
		},
	];

	const menuItems: IMenuItem[] = [
		{
			name: "Plato 1",
			ingredients: "Ingrediente 1, Ingrediente 2, Ingrediente 4",
			price: "10.00",
		},
		{
			name: "Plato 2",
			ingredients: "Ingrediente 1, Ingrediente 2, Ingrediente 3",
			price: "12.00",
		},
		{
			name: "Plato 3",
			ingredients: "Ingrediente 1, Ingrediente 3, Ingrediente 4",
			price: "15.00",
		},
	];

	return (
		<div className="flex justify-center min-h-screen">
			<div className="container px-4 md:px-8 py-8 flex flex-col gap-6">
				<p className="text-4xl font-bold text-success">Pedidos</p>
				<DynamicTable
					rows={orders}
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
							onOpenCreate={onOpen}
							showSearch={false}
						/>
					}
					bottomContent={
						<BottomContent
							selectedKeys={new Set()}
							filteredItemsLength={orders.length}
							page={page}
							pages={Math.ceil(orders.length / rowsPerPage)}
							handlePageChange={handlePageChange}
						/>
					}
				/>
				<Divider />
				<TodayMenu menuItems={menuItems} />
			</div>
			<ToastContainer />
			<CreateOrderModal isOpen={isOpen} onOpenChange={onOpenChange} />
		</div>
	);
};

export default Orders;
