import type { IDish } from "@interfaces/IOrder";
import React, { type FC } from "react";

const MenuDish: FC<IDish> = ({ name, ingredients }) => {
	return (
		<div>
			<h3 className="font-bold">{name}</h3>
			<p className="text-sm text-gray-500">{ingredients}</p>
		</div>
	);
};

export default MenuDish;
