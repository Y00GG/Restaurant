"use client";

import { DynamicTable } from "@components/common";
import type { IMostSoldDishes } from "@interfaces/ISale";
import type { IColumn } from "@interfaces/ITableState";
import React, { useMemo } from "react";
import { mostSoldDishes } from "./data";

const MostSoldDishes = () => {
	const columns: IColumn<IMostSoldDishes>[] = useMemo(
		() => [
			{ uid: "name", name: "Nombre", sortable: true },
			{ uid: "sales", name: "Ventas", sortable: true, align: "end" },
		],
		[],
	);

	return <DynamicTable rows={mostSoldDishes} columns={columns} />;
};

export default MostSoldDishes;
