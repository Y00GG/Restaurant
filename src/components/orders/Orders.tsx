"use client";
import { DynamicTable } from "@components/common";
import type { IOrder } from "@interfaces/IOrder";
import type { IColumn } from "@interfaces/ITableState";
import {
	Button,
	Chip,
	Divider,
	Listbox,
	ListboxItem,
	Tab,
	Tabs,
} from "@nextui-org/react";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { OrderCancel, OrderMake } from ".";

interface MenuItem {
	name: string;
	ingredients: string;
	price: string;
}

const Orders: React.FC = () => {
	const notify = () =>
		toast("Pedido entregado", { type: "success", position: "top-center" });
	const [currentTab, setCurrentTab] = useState<string>("lista");
	const [orders, setOrders] = useState<IOrder[]>([
		{ id: 1, description: "Plato 1 (2), Plato 2 (1)", status: "completed" },
		{ id: 2, description: "Plato 1 (1)", status: "completed" },
		{ id: 3, description: "Plato 2 (3), Plato 3 (2)", status: "completed" },
		{ id: 4, description: "Plato 1 (5), Plato 3 (2)", status: "completed" },
	]);

	const columns: IColumn<IOrder>[] = [
		{ name: "#", uid: "id" },
		{ name: "Pedido", uid: "description" },
		{
			name: "Confirmar",
			uid: "actions",
			renderCell: (item) => (
				<Button isIconOnly color="success" onClick={notify}>
					<FaCheckCircle />
				</Button>
			),
		},
	];

	const menuItems: MenuItem[] = [
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
				<DynamicTable rows={orders} columns={columns} />
				<Divider />
				<div>
					<p className="text-2xl font-bold text-green-500 mb-4">Menú de Hoy</p>
					<Listbox>
						{menuItems.map((item, index) => (
							<ListboxItem key={index.toString()} textValue={item.name}>
								<div className="flex justify-between items-center w-full">
									<div>
										<h3 className="font-bold">{item.name}</h3>
										<p className="text-sm text-gray-500">{item.ingredients}</p>
									</div>
									<span className="text-sm font-bold text-green-600">
										${item.price}
									</span>
								</div>
							</ListboxItem>
						))}
					</Listbox>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default Orders;
