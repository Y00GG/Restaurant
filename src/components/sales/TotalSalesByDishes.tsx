"use client";

import { DynamicTable } from "@components/common";
import type { ITotalSalesByDishes } from "@interfaces/ISale";
import type { IColumn } from "@interfaces/ITableState";
import React, { useMemo } from "react";
import { totalSalesByDish } from "./data";

const TotalSalesByDishes = () => {
	const columns: IColumn<ITotalSalesByDishes>[] = useMemo(
		() => [
			{ uid: "name", name: "Nombre", sortable: true },
			{ uid: "sales", name: "Ventas", sortable: true, align: "end" },
		],
		[],
	);

	const bottomContent = (
		<div className="flex justify-between">
			<p className="font-bold">Total:</p>
			<p>$35.456.456</p>
		</div>
	);

	return (
		<DynamicTable
			rows={totalSalesByDish}
			columns={columns}
			bottomContent={bottomContent}
		/>
	);
};

export default TotalSalesByDishes;
