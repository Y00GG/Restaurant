import { zodResolver } from "@hookform/resolvers/zod";
import type { IWaiterForm } from "@interfaces/IWaiter";
import { Button, Input, Spacer } from "@nextui-org/react";
import waiterSchema from "@schemas/waiter.schema";
import type { FC } from "react";
import { useForm } from "react-hook-form";

interface Props {
	onClose: () => void;
}

const CreateWaiterForm: FC<Props> = ({ onClose }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IWaiterForm>({
		resolver: zodResolver(waiterSchema),
	});

	const onSubmit = (data: IWaiterForm) => {
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
				label="Nombres"
				{...register("name")}
				isInvalid={Boolean(errors.name)}
				errorMessage={errors.name?.message}
				fullWidth
			/>
			<Input
				label="Apellidos"
				{...register("lastName")}
				isInvalid={Boolean(errors.lastName)}
				errorMessage={errors.lastName?.message}
				fullWidth
			/>
			<Input
				label="No. CC"
				type="number"
				{...register("cc")}
				isInvalid={Boolean(errors.cc)}
				errorMessage={errors.cc?.message}
				fullWidth
			/>
			<Input
				label="Teléfono"
				type="number"
				{...register("phone")}
				isInvalid={Boolean(errors.phone)}
				errorMessage={errors.phone?.message}
				fullWidth
			/>
			<Input
				label="Usuario"
				{...register("username")}
				isInvalid={Boolean(errors.username)}
				errorMessage={errors.username?.message}
				fullWidth
			/>
			<Input
				label="Contraseña"
				type="password"
				{...register("password")}
				isInvalid={Boolean(errors.password)}
				errorMessage={errors.password?.message}
				fullWidth
			/>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<Button type="submit" color="success" onClick={onClose}>
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

export default CreateWaiterForm;
