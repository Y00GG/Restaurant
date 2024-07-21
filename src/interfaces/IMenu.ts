import type menuSchema from "@schemas/menu.schema";
import type { z } from "zod";

export interface IMenu {
	id: number;
	name: string;
	ingredients: string[];
	price: number;
}

export type IMenuForm = z.infer<typeof menuSchema>;
