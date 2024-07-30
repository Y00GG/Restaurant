import type waiterSchema from "@schemas/waiter.schema";
import type { z } from "zod";

export interface IWaiter {
	id: number;
	name: string;
	phone: string;
	cc: string;
}

export interface IWaiterState {
	loading: boolean;
	getWaiters: () => Promise<void>;
}

export interface IGetWaiter {
	menuItems: MenuItem[];
	totalPages: number;
	currentPage: number;
}

export interface MenuItem {
	_id: string;
	nombre: string;
	descripcion: string;
	precio: number;
	categoriaId: string;
	restauranteId: string;
}

export type IWaiterForm = z.infer<typeof waiterSchema>;
