import type orderSchema from "@schemas/order.schema";
import type { z } from "zod";

export interface IOrder {
	id: number;
	description: string;
	status: string;
}

export interface IMenuItem {
	name: string;
	ingredients: string;
	price: string;
}

export type IOrderForm = z.infer<typeof orderSchema>;
