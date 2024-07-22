import { zodResolver } from "@hookform/resolvers/zod";
import type { IOrderForm } from "@interfaces/IOrder";
import { Button, Input, Select, SelectItem, Spacer } from "@nextui-org/react";
import orderSchema from "@schemas/order.schema";
import type { FC } from "react";
import { useForm } from "react-hook-form";

interface Props {
	onClose: () => void;
}

const menuItems = [
	{ label: "Plato 1", value: "plato1" },
	{ label: "Plato 2", value: "plato2" },
	{ label: "Plato 3", value: "plato3" },
];

const CreateOrderForm: FC<Props> = ({ onClose }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<IOrderForm>({
		resolver: zodResolver(orderSchema),
	});

	const onSubmit = (data: IOrderForm) => {
		console.log(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "16px",
			}}
		>
			<Select
				label="Platos"
				onChange={(e) => setValue("dishes", e.target.value)}
				isInvalid={Boolean(errors.dishes)}
				errorMessage={errors.dishes?.message}
				fullWidth
			>
				{menuItems.map((item) => (
					<SelectItem key={item.value} value={item.value}>
						{item.label}
					</SelectItem>
				))}
			</Select>
			<Input
				label="Cantidad"
				type="number"
				{...register("quantity")}
				isInvalid={Boolean(errors.quantity)}
				errorMessage={errors.quantity?.message}
				fullWidth
			/>

			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<Button type="submit" color="success">
					Crear
				</Button>
				<Spacer x={0.5} />
				<Button type="button" color="danger" onClick={onClose}>
					Cancelar
				</Button>
			</div>
		</form>
	);
};

export default CreateOrderForm;
