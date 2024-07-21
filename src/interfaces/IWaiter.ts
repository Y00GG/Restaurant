import type waiterSchema from "@schemas/waiter.schema";
import type { z } from "zod";

export interface IWaiter {
	id: number;
	name: string;
	phone: string;
	cc: string;
}

export type IWaiterForm = z.infer<typeof waiterSchema>;
