import type { IOrder } from "@interfaces/IOrder";
import { Card, CardBody } from "@nextui-org/react";
import React, { type FC } from "react";
import { FaTimesCircle } from "react-icons/fa";

interface Props {
	orders: IOrder[];
}

const OrderCancel: FC<Props> = ({ orders }) => {
	return (
		<div className="space-y-4">
			{orders.map((order, index) => (
				<Card key={order.id}>
					<CardBody>
						<div className="flex justify-between items-center">
							<div className="flex items-center space-x-2">
								<div className="font-bold">{index + 1}</div>
								<div>{order.description}</div>
							</div>
							<FaTimesCircle className="text-red-500" />
						</div>
					</CardBody>
				</Card>
			))}
		</div>
	);
};

export default OrderCancel;
