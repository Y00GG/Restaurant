import type { SortDescriptor } from "@nextui-org/react";
import type { ReactNode } from "react";

export interface IBaseItem {
	id: number | string;
}

export interface IColumn<T> {
	uid: keyof T | "actions";
	name: string;
	sortable?: boolean;
	align?: "start" | "center" | "end";
	renderCell?: (item: T) => ReactNode;
}
