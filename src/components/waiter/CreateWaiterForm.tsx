import { zodResolver } from "@hookform/resolvers/zod";
import type { IWaiterForm } from "@interfaces/IWaiter";
import { Button, Input, Spacer } from "@nextui-org/react";
import waiterSchema from "@schemas/waiter.schema";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { useWaiterStore } from "@store/waiter.store";

interface Props {
	onClose: () => void;
}

const CreateWaiterForm: FC<Props> = ({ onClose }) => {
	const { createWaiter } = useWaiterStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IWaiterForm>({
		resolver: zodResolver(waiterSchema),
	});

	const onSubmit = async (data: IWaiterForm) => {
		try {
			await createWaiter(data);
			onClose(); 
		} catch (error) {
			console.error("Error creating waiter:", error);
		}
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
				{...register("nombre")}
				isInvalid={Boolean(errors.nombre)}
				errorMessage={errors.nombre?.message}
				fullWidth
			/>
			<Input
				label="Apellidos"
				{...register("apellido")}
				isInvalid={Boolean(errors.apellido)}
				errorMessage={errors.apellido?.message}
				fullWidth
			/>
			<Input
				label="No. Identidad"
				type="number"
				{...register("numeroIdentidad")}
				isInvalid={Boolean(errors.numeroIdentidad)}
				errorMessage={errors.numeroIdentidad?.message}
				fullWidth
			/>
			<Input
				label="Teléfono"
				type="number"
				{...register("telefono")}
				isInvalid={Boolean(errors.telefono)}
				errorMessage={errors.telefono?.message}
				fullWidth
			/>
			<Input
				label="Correo Electrónico"
				{...register("email")}
				isInvalid={Boolean(errors.email)}
				errorMessage={errors.email?.message}
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

export default CreateWaiterForm;
