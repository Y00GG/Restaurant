"use client";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import type React from "react";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const OrderMake: React.FC = () => {
	const [selectedDish, setSelectedDish] = useState<string>("");
	const [quantity, setQuantity] = useState<number>(1);

	const handleAdd = () => {
		// Lógica para agregar pedido
	};

	const dishes = ["Plato 1", "Plato 2", "Plato 3"];

	return (
		<div className="space-y-4">
			<div className="flex gap-3 items-center">
				<Select
					value={selectedDish}
					onChange={(e) => setSelectedDish(e.target.value)}
				>
					{dishes.map((dish) => (
						<SelectItem key={dish} value={dish}>
							{dish}
						</SelectItem>
					))}
				</Select>
				<Input
					type="number"
					min="1"
					value={quantity.toString()} // Convertir quantity a string
					onChange={(e) => setQuantity(Number(e.target.value))}
				/>
				<Button color="success" onClick={handleAdd}>
					<FaCheckCircle />
				</Button>
			</div>
		</div>
	);
};

export default OrderMake;
