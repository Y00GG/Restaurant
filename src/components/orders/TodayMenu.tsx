import type { IMenuItem } from "@interfaces/IOrder";
import { Listbox, ListboxItem } from "@nextui-org/react";
import React, { type FC } from "react";

interface Props {
	menuItems: IMenuItem[];
}

const TodayMenu: FC<Props> = ({ menuItems }) => {
	return (
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
	);
};

export default TodayMenu;
