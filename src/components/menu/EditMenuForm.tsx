import { zodResolver } from "@hookform/resolvers/zod";
import type { IMenu, IMenuForm } from "@interfaces/IMenu";
import { Button, Input, Spacer } from "@nextui-org/react";
import menuSchema from "@schemas/menu.schema";
import type { FC } from "react";
import { useForm } from "react-hook-form";

interface Props {
	onClose: () => void;
	menu: IMenu;
}

const EditMenuForm: FC<Props> = ({ onClose, menu }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IMenuForm>({
		defaultValues: { ...menu },
		resolver: zodResolver(menuSchema),
	});

	const onSubmit = (data: IMenuForm) => {
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
			<Input
				label="Nombre"
				{...register("name")}
				isInvalid={Boolean(errors.name)}
				errorMessage={errors.name?.message}
				fullWidth
			/>
			<Input
				label="Ingredientes"
				{...register("ingredients")}
				isInvalid={Boolean(errors.ingredients)}
				errorMessage={errors.ingredients?.message}
				fullWidth
			/>
			<Input
				label="Price"
				type="number"
				{...register("price")}
				isInvalid={Boolean(errors.price)}
				errorMessage={errors.price?.message}
				fullWidth
			/>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<Button type="submit" color="success" onClick={onClose}>
					Editar
				</Button>
				<Spacer x={0.5} />
				<Button type="button" color="danger" onClick={onClose}>
					Cancelar
				</Button>
			</div>
		</form>
	);
};

export default EditMenuForm;
