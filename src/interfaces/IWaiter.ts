import type waiterSchema from "@schemas/waiter.schema";
import type { z } from "zod";
import { IBaseItem } from "./ITableState";

// interfaces/IWaiter.ts
export interface IWaiter extends IBaseItem{
	_id: string;
	nombre: string;
	apellido: string;
	email: string;
	telefono: string;
	numeroIdentidad: string;
	password: string;
	createdAt: string;
	updatedAt: string;
  }
  
  export interface IWaiterState {
	waiters: IWaiter[];
	loading: boolean;
	totalPages: number;
	currentPage: number;
	getWaiters: () => void;
	createWaiter: (waiter: IWaiterForm) => Promise<void>; // Nueva función para crear un mesero
	updateWaiter: (waiter: IWaiter) => Promise<void>;
	disableWaiter: (waiter: IWaiter) => Promise<void>;
}


export interface MenuItem {
	_id: string;
	nombre: string;
	descripcion: string;
	precio: number;
	categoriaId: string;
	restauranteId: string;
}

export interface IGetWaiter {
	users: IWaiter[];
	totalPages: number;
	currentPage: number;
  }
  
  


export type IWaiterForm = z.infer<typeof waiterSchema>;
